/* eslint-disable quote-props */
import Vuex from 'vuex';
import Vue from 'vue';

const defaultState = {
    platformData: {
        environment: 'localhost',
        name: undefined,
        appType: undefined,
        applicationId: undefined,
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
        name: undefined,
        httpStatusCode: 200,
        conversationId: undefined,
        orientation: undefined
    },
    events: []
};

const modifiedState = {
    platformData: {
        environment: 'test-environment',
        name: 'test-name',
        appType: 'test-appType',
        applicationId: 9,
        country: 'zu',
        language: 'ze',
        jeUserPercentage: 88,
        currency: 'zud',
        version: '9.8.7.6',
        instancePosition: '999',
        isPilot: false
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
        httpStatusCode: 200,
        conversationId: '460cc3a8-83f7-4e80-bb46-c8a69967f249',
        orientation: 'Landscape'
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

export {
    defaultState,
    defaultActions,
    modifiedState,
    newEvent,
    createStore,
    options
};
