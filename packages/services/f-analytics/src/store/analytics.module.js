import {
    PUSH_PLATFORM_DATA,
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
            applicationId: null,
            userAgent: 'N/A',
            branding: '',
            country: '',
            language: '',
            jeUserPercentage: undefined,
            currency: '',
            version: '0.0.0.0',
            instancePosition: 'N/A'
        },
        events: []
    }),

    actions: {
        pushPlatformData: ({ commit, state }, platformData) => {
            if (platformData) {
                commit(PUSH_PLATFORM_DATA, platformData);
            }

            if (isDataLayerPresent()) {
                window.dataLayer.push({ platformData: { ...state.platformData } });
            }
        },

        pushEvent: ({ commit, state }, event) => {
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

        [PUSH_EVENT]: (state, event) => {
            state.events = [...state.events, event];
        },

        [CLEAR_EVENTS]: state => {
            state.events = [];
        }
    }
};
