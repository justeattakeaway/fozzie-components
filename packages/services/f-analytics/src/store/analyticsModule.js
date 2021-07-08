export default {
    namespaced: true,

    state: () => ({
        platformData: {
            environment: '',
            name: '',
            appType: '',
            applicationId: 0,
            userAgent: '',
            branding: '',
            country: '',
            language: '',
            jeUserPercentage: 0,
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
