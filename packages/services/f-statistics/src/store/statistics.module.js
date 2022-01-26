import { IS_BATCH_PUBLISHING_ENABLED, BATCH_QUEUE_SIZE, BATCH_INTERVAL_TIMER } from '../config';
import {
    ADD_TO_PUBLISH_QUEUE, CLEAR_PUBLISH_QUEUE, SET_INTERVAL_TIMER, CLEAR_INTERVAL_TIMER
} from './mutation-types';

/**
 * Publishes logs individually using Just Log before clearing the interval and removing logs from state
 *
 * @param {array} queue - The array of log statistics
 * @return {boolean} true if the number of logs in the queue is equal or greater than the config value.
 */
const isQueueLengthExceeded = queue => queue.length >= BATCH_QUEUE_SIZE;

/**
 * Publishes logs individually using Just Log before clearing the interval and removing logs from state.
 *
 * @param {array} queue - The array of log statistics
 * @param {object} commit - Vuex commit function to trigger mutation
 * @param {object} justLog - Instance of JustLog
 */
const publishQueue = (queue, commit, justLog) => {
    queue.forEach(({ message, payload }) => {
        justLog.info(message, {
            ...payload
        });
    });
    commit(CLEAR_PUBLISH_QUEUE);
    commit(CLEAR_INTERVAL_TIMER);
};

/**
 * Calls mutation to start publish timer if it does not already exist and batch mode is enabled.
 *
 * @param {object} state - The state from the store
 * @param {array} state.queue - The array of log statistics
 * @param {object} state.interval - The timer variable
 * @param {object} commit - Vuex commit function to trigger mutation
 * @param {object} justLog - Instance of JustLog
 */
const startBatchPublishTimer = ({ queue, interval }, commit, justLog) => {
    if (!interval && IS_BATCH_PUBLISHING_ENABLED) {
        commit(SET_INTERVAL_TIMER, () => publishQueue(queue, commit, justLog));
    }
};

/**
 * Controls publishing of logs. If not in batch mode or if batch size is met.
 *
 * @param {array} queue - The array of log statistics
 * @param {object} commit - Vuex commit function to trigger mutation
 * @param {object} justLog - Instance of JustLog
 */
const shouldPublishQueuedLogs = ({ queue }, commit, justLog) => {
    if (!IS_BATCH_PUBLISHING_ENABLED || isQueueLengthExceeded(queue)) {
        publishQueue(queue, commit, justLog);
    }
};


export default {
    namespaced: true,

    state: () => ({
        interval: null,
        queue: []
    }),

    actions: {
        addToPublishQueue: ({ commit, state }, { log, justLog }) => {
            startBatchPublishTimer(state, commit, justLog);
            commit(ADD_TO_PUBLISH_QUEUE, log);
            shouldPublishQueuedLogs(state, commit, justLog);
        }
    },

    mutations: {
        [ADD_TO_PUBLISH_QUEUE]: (state, log) => {
            state.queue.push(log);
        },
        [CLEAR_PUBLISH_QUEUE]: state => {
            state.queue = [];
        },
        [SET_INTERVAL_TIMER] (state, cb) {
            state.interval = setInterval(() => {
                cb();
            }, BATCH_INTERVAL_TIMER);
        },
        [CLEAR_INTERVAL_TIMER] (state) {
            clearInterval(state.interval);
            state.interval = null;
        }
    }
};
