import {
    PUSH_PLATFORM_DATA,
    PUSH_USER_DATA,
    PUSH_PAGE_DATA,
    PUSH_EVENT,
    CLEAR_EVENTS
} from './mutation-types';

const isDataLayerPresent = () => typeof (window) !== 'undefined' && window.dataLayer;

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
        },
        events: []
    }),

    actions: {
        [PUSH_PLATFORM_DATA]: ({ commit, state }, platformData) => {
            if (platformData) {
                commit(PUSH_PLATFORM_DATA, platformData);
            }

            if (isDataLayerPresent()) {
                window.dataLayer.push({ platformData: { ...state.platformData } });
            }
        },

        [PUSH_USER_DATA]: userData => {
            if (userData && isDataLayerPresent()) {
                window.dataLayer.push({ userData: { ...userData } });
            }
        },

        [PUSH_PAGE_DATA]: ({ commit, state }, pageData) => {
            if (pageData) {
                commit(PUSH_PAGE_DATA, pageData);
            }

            if (isDataLayerPresent()) {
                window.dataLayer.push({ pageData: { ...state.pageData } });
            }
        },

        [PUSH_EVENT]: ({ commit, state }, event) => {
            if (event) {
                commit(PUSH_EVENT, event);
            }

            if (isDataLayerPresent() && state.events) {
                state.events.forEach(e => window.dataLayer.push({ ...e }));
                commit(CLEAR_EVENTS);
            }
        }
    },

    mutations: {
        [PUSH_PLATFORM_DATA]: (state, platformData) => {
            state.platformData = { ...state.platformData, ...platformData };
        },

        [PUSH_PAGE_DATA]: (state, pageData) => {
            state.pageData = { ...state.pageData, ...pageData };
        },

        [PUSH_EVENT]: (state, event) => {
            state.events = [...state.events, event];
        },

        [CLEAR_EVENTS]: state => {
            state.events = [];
        }
    }
};
