import {
    UPDATE_PLATFORM_DATA,
    UPDATE_PAGE_DATA,
    UPDATE_EVENTS,
    CLEAR_EVENTS
} from './mutation-types';

export default {
    namespaced: true,

    state: () => ({
        platformData: {
            environment: 'localhost',
            name: '',
            appType: '',
            applicationId: undefined,
            userAgent: 'N/A',
            branding: '',
            country: '',
            language: '',
            jeUserPercentage: undefined,
            currency: '',
            version: '0.0.0.0',
            instancePosition: 'N/A'
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
            name: '',
            group: '',
            httpStatusCode: 0,
            isCached: false,
            conversationId: '',
            requestId: '',
            orientation: '',
            display: ''
        },
        events: []
    }),

    actions: {
        updatePlatformData: ({ commit }, platformData) => {
            commit(UPDATE_PLATFORM_DATA, platformData);
        },

        updatePageData: ({ commit }, pageData) => {
            commit(UPDATE_PAGE_DATA, pageData);
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

        [UPDATE_PAGE_DATA]: (state, pageData) => {
            state.pageData = { ...state.pageData, ...pageData };
        },

        [UPDATE_EVENTS]: (state, event) => {
            state.events = [...state.events, event];
        },

        [CLEAR_EVENTS]: state => {
            state.events = [];
        }
    }
};
