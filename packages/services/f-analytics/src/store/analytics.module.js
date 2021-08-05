export default {
    namespaced: true,

    state: () => ({
        platformData: {
            environment: '',
            name: '',
            appType: '',
            applicationId: null,
            userAgent: '',
            branding: '',
            country: '',
            language: '',
            jeUserPercentage: null,
            currency: '',
            version: '',
            instancePosition: ''
        }
    }),

    actions: {
        updatePlatformData: ({ commit }, platformData) => {
            commit('updatePlatformData', platformData);
        }
    },

    mutations: {
        updatePlatformData: (state, platformData) => {
            state.platformData = platformData;
        }
    }
};
