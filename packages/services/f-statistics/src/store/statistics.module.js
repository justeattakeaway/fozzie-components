import { IS_BATCH_PUBLISHING_ENABLED, BATCH_QUEUE_SIZE, BATCH_INTERVAL_TIMER } from '../config';
import {
    ADD_TO_PUBLISH_QUEUE, CLEAR_PUBLISH_QUEUE, SET_INTERVAL_TIMER, CLEAR_INTERVAL_TIMER
} from './mutation-types';

const isQueueLengthExceeded = publishQueue => publishQueue.length >= BATCH_QUEUE_SIZE;

const processAndPublishQueue = (publishQueue, commit, justLog) => {
    publishQueue.forEach(({ message, payload }) => {
        justLog.info(message, {
            ...payload
        });
    });
    commit(CLEAR_PUBLISH_QUEUE);
    commit(CLEAR_INTERVAL_TIMER);
};

const shouldStartPublishTimer = (interval, commit, publishLogs) => {
    if (!interval && IS_BATCH_PUBLISHING_ENABLED) {
        console.log('Starting publish timer');
        commit(SET_INTERVAL_TIMER, () => publishLogs());
    }
};

const shouldStartToPublish = (publishQueue, publishLogs) => {
    if (!IS_BATCH_PUBLISHING_ENABLED || isQueueLengthExceeded(publishQueue)) {
        publishLogs();
    }
};


export default {
    namespaced: true,

    state: () => ({
        interval: null,
        publishQueue: []
    }),

    actions: {
        addToPublishQueue: ({ commit, state }, { log, justLog }) => {
            const { publishQueue, interval } = state;
            const publishLogs = () => processAndPublishQueue(publishQueue, commit, justLog);
            shouldStartPublishTimer(interval, commit, publishLogs);
            commit(ADD_TO_PUBLISH_QUEUE, log);
            console.log(`Add log to queue (${publishQueue.length})`);
            shouldStartToPublish(publishQueue, publishLogs);
        }
    },

    mutations: {
        [ADD_TO_PUBLISH_QUEUE]: (state, log) => {
            state.publishQueue.push(log);
        },
        [CLEAR_PUBLISH_QUEUE]: state => {
            state.publishQueue = [];
        },
        [SET_INTERVAL_TIMER] (state, callbackAction) {
            state.interval = setInterval(() => {
                callbackAction();
            }, BATCH_INTERVAL_TIMER);
        },
        [CLEAR_INTERVAL_TIMER] (state) {
            clearInterval(state.interval);
            state.interval = null;
        }
    }
};
