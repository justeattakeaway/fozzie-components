const SET_FM_CONFIG_JSON = 'SET_FM_CONFIG_JSON';

export default {
    namespaced: true,

    state: () => ({
        configJson: {}
    }),

    actions: {
        update: ({ commit }, configJson) => {
            commit(SET_FM_CONFIG_JSON, configJson);
        }
    },

    mutations: {
        [SET_FM_CONFIG_JSON]: (state, configJson) => {
            state.configJson = configJson;
        }
    }
};
