import Vuex from 'vuex';
import Vue from 'vue';

const defaultState = {
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
};

const modifieldState = {
    platformData: {
        environment: 'test-environment',
        name: 'test-name',
        appType: 'test-appType',
        applicationId: 9,
        userAgent: 'test-userAgent',
        branding: 'test-branding',
        country: 'zu',
        language: 'ze',
        jeUserPercentage: 88,
        currency: 'zud',
        version: '9.8.7.6',
        instancePosition: '999'
    },
    events: []
};

const newEvent = {
    event: 'jazzy',
    experiment: {
        id: 'EX-1234',
        name: 'Some very special experiment',
        platform: 'experiment_api',
        variant: {
            name: 'increase_a'
        },
        version: 1
    }
};

const defaultActions = {
    pushPlatformData: jest.fn(),
    pushEvent: jest.fn()
};

const createStore = ({
    name = 'f-analytics',
    state = defaultState,
    actions = defaultActions
} = {}) => {
    Vue.use(Vuex);
    return new Vuex.Store({
        modules: {
            [`${name}`]: {
                namespaced: true,
                state,
                actions
            },
            hasModule: jest.fn(() => true)
        }
    });
};

const $cookies = {
    get: jest.fn()
};

const $route = {
    name: 'test-route-name'
};

const $i18n = {
    locale: 'en-GB'
};

const options = {
    namespace: 'f-analytics',
    featureName: 'test-route-name',
    locale: 'en-GB',
    id: 'GTM-0000000'
};

export {
    defaultState,
    defaultActions,
    modifieldState,
    newEvent,
    createStore,
    $cookies,
    $route,
    $i18n,
    options
};

