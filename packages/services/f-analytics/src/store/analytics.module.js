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
        },
        pageData: {
            name: '',
            group: '',
            httpStatusCode: 0,
            isCached: false,
            conversationId: '',
            requestId: '',
            orientation: '',
            display: ''
        }
    }),

    actions: {
        updatePlatformData: ({ commit }, platformData) => {
            commit('updatePlatformData', platformData);
        },
        updatePageData: ({ commit }, pageData) => {
            commit('updatePageData', pageData);
        }
    },

    mutations: {
        updatePlatformData: (state, platformData) => {
            state.platformData = platformData;
        },
        updatePageData: (state, pageData) => {
            state.pageData = pageData;
        }
    }
};
