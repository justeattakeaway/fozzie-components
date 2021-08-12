export default {
    name: 'Analytics',

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
        userData: {
            'a-UserId': '',
            authType: undefined,
            email: undefined,
            globalUserId: undefined,
            signinType: undefined,
            signupDate: undefined
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
        updateUserData: ({ commit }, userData) => {
            commit('pushUserData', userData);
        },
        updatePageData: ({ commit }, pageData) => {
            commit('pushPageData', pageData);
        }
    },

    mutations: {
        pushPlatformData: (state, platformData) => {
            state.platformData = platformData;
        },
        pushUserData: (state, userData) => {
            state.userData = userData;
        },
        pushPageData: (state, pageData) => {
            state.pageData = pageData;
        }
    }
};
