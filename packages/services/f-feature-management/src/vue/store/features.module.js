import SET_FM_CONFIG_JSON from './mutation.types';

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
