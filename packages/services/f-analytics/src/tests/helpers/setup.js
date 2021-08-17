/* eslint-disable quote-props */
import Vuex from 'vuex';
import Vue from 'vue';

const defaultState = {
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
};

const modifiedState = {
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
    userData: {
        'a-UserId': 'xxxx-xxxx',
        authType: 'Login',
        email: 'gjfkdgjdkgjhd',
        globalUserId: 'fdsgsgsgsg',
        signinType: 'Email',
        signupDate: '2021-05-12T10:57:05.9130000Z'
    },
    pageData: {
        name: 'test-name',
        group: 'test-group',
        httpStatusCode: 200,
        isCached: false,
        conversationId: '460cc3a8-83f7-4e80-bb46-c8a69967f249',
        requestId: '6cbe6509-9122-4e66-a90a-cc483c34282e',
        orientation: 'Landscape',
        display: 'wide'
    }
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

const options = {
    namespace: 'f-analytics',
    featureName: 'test-feature-name',
    locale: 'en-GB',
    id: 'GTM-0000000'
};

const defaultActions = {
    updatePlatformData: jest.fn(),
    updatePageData: jest.fn(),
    updateEvents: jest.fn()
};

const defaultGetters = {};

const defaultMutations = {
    updatePlatformData: jest.fn(),
    updatePageData: jest.fn(),
    updateEvents: jest.fn(),
    clearEvents: jest.fn()
};

const createStore = ({
    name = options.namespace,
    state = defaultState,
    actions = defaultActions,
    getters = defaultGetters,
    mutations = defaultMutations
} = {}) => {
    Vue.use(Vuex);
    return new Vuex.Store({
        modules: {
            [`${name}`]: {
                namespaced: true,
                state,
                actions,
                getters,
                mutations
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

const userIdFromCookie = 'fjdhskgshjgk';

const authTokenRegistered = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
+ 'eyJlbWFpbCI6ImpvZS5ibG9nZ3NAanVzdGVhdHRha2Vhd2F5LmNvbS'
+ 'IsImNyZWF0ZWRfZGF0ZSI6IjIwMjEtMDItMDhUMTA6Mjc6NDkuMTkz'
+ 'MDAwMFoiLCJuYW1lIjoiSm9lIEJsb2dncyIsImdsb2JhbF91c2VyX2lkI'
+ 'joiVTdOUkFsV0FnNXpPZHNkUmdmN25rVHlvaTkwWEVvPSIsImdpdmVuX25h'
+ 'bWUiOiJKb2UiLCJmYW1pbHlfbmFtZSI6IkJsb2dncyIsImlhdCI6MTYxNTQ2OTUxNn0.VapH6uHnn4lHIkvN_mS9A9IVVWL0YPNE39gDDD-l7SU';

const authTokenGuest = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
+ 'eyJlbWFpbCI6ImpvZS5ibG9nZ3NAanVzdGVhdHRha2Vhd2F5LmNvbSIsImNyZ'
+ 'WF0ZWRfZGF0ZSI6IjIwMjEtMDItMDhUMTA6Mjc6NDkuMTkzMDAwMFoiLCJuYW'
+ '1lIjoiSm9lIEJsb2dncyIsImdsb2JhbF91c2VyX2lkIjoiVTdOUkFsV0FnNXp'
+ 'PZHNkUmdmN25rVHlvaTkwWEVvPSIsImdpdmVuX25hbWUiOiJKb2UiLCJmYW1p'
+ 'bHlfbmFtZSI6IkJsb2dncyIsInN1YiI6IjEyMzQ1Iiwicm9sZSI6Ikd1ZXN0Ii'
+ 'wiaWF0IjoxNjE1NDY5NTE2fQ.ngfAKpiMH4Gk0Y4gAVC4KeLadWFtVXx4hD1_BSW9SN0';

const userDataWithAuthTokenRegistered = {
    'a-UserId': userIdFromCookie,
    authType: 'Login',
    email: '1a9a31f72fbb57efd148bbfe06c169b97f6868200b422a5ae7fed7e3f853002a',
    globalUserId: 'U7NRAlWAg5zOdsdRgf7nkTyoi90XEo=',
    signinType: 'Email',
    signupDate: '2021-02-08T10:27:49.1930000Z'
};

const userDataWithAuthTokenGuest = {
    'a-UserId': userIdFromCookie,
    authType: 'Login',
    email: '1a9a31f72fbb57efd148bbfe06c169b97f6868200b422a5ae7fed7e3f853002a',
    globalUserId: 'U7NRAlWAg5zOdsdRgf7nkTyoi90XEo=',
    signinType: 'Guest',
    signupDate: '2021-02-08T10:27:49.1930000Z'
};

const userDataWithoutAuthToken = {
    'a-UserId': userIdFromCookie,
    authType: undefined,
    email: undefined,
    globalUserId: undefined,
    signinType: undefined,
    signupDate: undefined
};

export {
    defaultState,
    defaultActions,
    modifiedState,
    newEvent,
    createStore,
    $cookies,
    $route,
    $i18n,
    options,
    userIdFromCookie,
    authTokenRegistered,
    authTokenGuest,
    userDataWithAuthTokenRegistered,
    userDataWithAuthTokenGuest,
    userDataWithoutAuthToken
};
