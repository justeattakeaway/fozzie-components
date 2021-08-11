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
        }
    }),

    actions: {
        updatePlatformData: ({ commit }, platformData) => {
            commit('pushPlatformData', platformData);
        },
        updateUserData: ({ commit }, userData) => {
            commit('pushUserData', userData);
        }
    },

    mutations: {
        pushPlatformData: (state, platformData) => {
            state.platformData = platformData;
        },
        pushUserData: (state, userData) => {
            state.userData = userData;
        }
    }
};
