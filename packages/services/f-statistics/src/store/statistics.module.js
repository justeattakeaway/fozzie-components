import { BATCH_INTERVAL_TIMER } from '../config';
import {
    ADD_TO_PUBLISH_QUEUE, CLEAR_PUBLISH_QUEUE, SET_INTERVAL_TIMER, CLEAR_INTERVAL_TIMER
} from './mutation-types';

import startBatchPublishTimer from './services/startBatchPublishTimer';
import shouldPublishQueuedLogs from './services/shouldPublishQueuedLogs';

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
