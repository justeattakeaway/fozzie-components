import {
    UPDATE_PLATFORM_DATA,
    UPDATE_EVENTS,
    CLEAR_EVENTS
} from './mutation-types';

export default {
    namespaced: true,

    state: () => ({
        platformData: {
            environment: 'localhost',
            name: undefined,
            appType: undefined,
            applicationId: undefined,
            userAgent: undefined,
            branding: undefined,
            country: undefined,
            language: undefined,
            jeUserPercentage: undefined,
            currency: undefined,
            version: undefined,
            instancePosition: undefined,
            isPilot: undefined
        },
        userData: {
            'a-UserId': undefined,
            authType: undefined,
            email: undefined,
            globalUserId: undefined,
            signinType: undefined,
            signupDate: undefined
        },
        pageData: {
            group: undefined,
            name: undefined,
            httpStatusCode: 200,
            conversationId: undefined,
            requestId: undefined,
            orientation: undefined,
            display: undefined
        },
        events: []
    }),

    actions: {
        updatePlatformData: ({ commit }, platformData) => {
            commit(UPDATE_PLATFORM_DATA, platformData);
        },

        updateEvents: ({ commit }, event) => {
            commit(UPDATE_EVENTS, event);
        },

        clearEvents: ({ commit }) => {
            commit(CLEAR_EVENTS);
        }
    },

    mutations: {
        [UPDATE_PLATFORM_DATA]: (state, platformData) => {
            state.platformData = { ...state.platformData, ...platformData };
        },

        [UPDATE_EVENTS]: (state, event) => {
            state.events = [...state.events, event];
        },

        [CLEAR_EVENTS]: state => {
            state.events = [];
        }
    }
};
