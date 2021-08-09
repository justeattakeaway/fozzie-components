export default {
    namespaced: true,

    state: () => ({
        platformData: {
            environment: '',
            name: '',
            appType: '',
            applicationId: undefined,
            userAgent: '',
            branding: '',
            country: '',
            language: '',
            jeUserPercentage: undefined,
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
            commit('pushPlatformData', platformData);
        },
        updatePageData: ({ commit }, pageData) => {
            commit('pushPageData', pageData);
        }
    },

    mutations: {
        pushPlatformData: (state, platformData) => {
            state.platformData = platformData;
        },
        pushPageData: (state, pageData) => {
            state.pageData = pageData;
        }
    }
};
