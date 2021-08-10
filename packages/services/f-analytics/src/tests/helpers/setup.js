/* eslint-disable quote-props */
import Vuex from 'vuex';

const defaultState = {
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
};

const updatedPlatformData = {
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
};

const updatedPageData = {
    name: 'test-name',
    group: 'test-group',
    httpStatusCode: 200,
    isCached: false,
    conversationId: '460cc3a8-83f7-4e80-bb46-c8a69967f249',
    requestId: '6cbe6509-9122-4e66-a90a-cc483c34282e',
    orientation: 'Landscape',
    display: 'wide'
};

const updatedUserData = {
    'a-UserId': 'xxxx-xxxx',
    authType: 'Login',
    email: 'gjfkdgjdkgjhd',
    globalUserId: 'fdsgsgsgsg',
    signinType: 'Email',
    signupDate: '2021-05-12T10:57:05.9130000Z'
};

const defaultActions = {
    updatePlatformData: jest.fn(),
    updateUserData: jest.fn(),
    updatePageData: jest.fn()
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
    updatedPlatformData,
    updatedPageData,
    updatedUserData,
    createStore,
    $cookies,
    $route,
    $i18n
};

