import { IS_BATCH_PUBLISHING_ENABLED, BATCH_QUEUE_SIZE, BATCH_INTERVAL_TIMER } from '../config';
import {
    ADD_TO_PUBLISH_QUEUE, CLEAR_PUBLISH_QUEUE, SET_INTERVAL_TIMER, CLEAR_INTERVAL_TIMER
} from './mutation-types';

const isQueueLengthExceeded = publishQueue => publishQueue.length >= BATCH_QUEUE_SIZE;

const processAndPublishQueue = (publishQueue, justLog) => {
    publishQueue.forEach(({ message, payload }) => {
        justLog.info(message, {
            ...payload
        });
    });
};

export default {
    namespaced: true,

    state: () => ({
        interval: null,
        publishQueue: []
    }),

    actions: {
        addToPublishQueue: ({ commit, state, dispatch }, { log, justLog }) => {
            const { publishQueue } = state;

            if (!publishQueue.length && IS_BATCH_PUBLISHING_ENABLED) {
                console.log('Starting publish timer');
                commit(SET_INTERVAL_TIMER, () => dispatch('publishLogs'));
            }
            commit(ADD_TO_PUBLISH_QUEUE, log);
            console.log(`Add log to queue (${publishQueue.length})`);
            if (!IS_BATCH_PUBLISHING_ENABLED || isQueueLengthExceeded(publishQueue)) {
                dispatch('publishLogs', justLog);
            }
        },
        publishLogs: ({ commit, state }, justLog) => {
            const { publishQueue } = state;
            console.log(`Publish ${publishQueue.length} logs`);
            processAndPublishQueue(publishQueue, justLog);
            commit(CLEAR_PUBLISH_QUEUE);
            commit(CLEAR_INTERVAL_TIMER);
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
