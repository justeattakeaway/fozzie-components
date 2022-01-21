const ADD_TO_PUBLISH_QUEUE = 'ADD_TO_PUBLISH_QUEUE';

export default {
    namespaced: true,

    state: () => ({
        publishQueue: []
    }),

    actions: {
        addToPublishQueue: ({ commit }, log) => {
            commit(ADD_TO_PUBLISH_QUEUE, log);
        }
    },

    mutations: {
        [ADD_TO_PUBLISH_QUEUE]: (state, log) => {
            state.publishQueue.push(log);
        }
    }
};
