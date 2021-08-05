import Vuex from 'vuex';

const defaultState = {
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
    }
};

const defaultActions = {
    updatePlatformData: jest.fn(),
    updatePageData: jest.fn()
};

const gtmSettings = {
    namespace: 'f-analytics',
    id: 'GTM-123456A'
};

const createStore = ({
    name = 'f-analytics',
    state = defaultState,
    actions = defaultActions
} = {}) => new Vuex.Store({
    modules: {
        [`${name}`]: {
            namespaced: true,
            state,
            actions
        },
        hasModule: jest.fn(() => true)
    }
});

const $cookies = {
    get: jest.fn()
};

const $route = {
    name: 'test-route-name'
};

const $i18n = {
    locale: 'en-GB'
};

export {
    defaultState,
    defaultActions,
    modifieldState,
    createStore,
    gtmSettings,
    $cookies,
    $route,
    $i18n
};

