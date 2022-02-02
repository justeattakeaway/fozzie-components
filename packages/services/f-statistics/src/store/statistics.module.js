
import {
    ADD_LOG, CLEAR_LOGS
} from './mutation-types';


export default {
    namespaced: true,

    state: () => ({
        logs: []
    }),

    actions: {
        addLog: ({ commit }, log) => {
            commit(ADD_LOG, log);
        },
        clearLogs: ({ commit }) => {
            commit(CLEAR_LOGS);
        }
    },

    mutations: {
        [ADD_LOG]: (state, log) => {
            state.logs.push(log);
        },
        [CLEAR_LOGS]: state => {
            state.logs = [];
        }
        // [SET_INTERVAL_TIMER] (state, cb) {
        //     state.interval = setInterval(() => {
        //         cb();
        //     }, BATCH_INTERVAL_TIMER);
        // },
        // [CLEAR_INTERVAL_TIMER] (state) {
        //     clearInterval(state.interval);
        //     state.interval = null;
        // }
    }
};
