import Vuex from 'vuex';
import tenantConfigs from '../../../tenants';

const defaultState = {
    exclusions: [{ type: 'alcohol', state: '', expiryDate: '' }]
};

const defaultActions = {
    getExclusions: jest.fn(),
    updateAlcoholExclusion: jest.fn()
};

const defaultGetters = {
    exclusions () {
        return defaultState.exclusions;
    }
};

const i18n = {
    locale: 'en-AU',
    messages: {
        'en-AU': tenantConfigs['en-AU'].messages
    }
};

const createStore = (
    state = defaultState,
    actions = defaultActions,
    getters = defaultGetters
) => new Vuex.Store({
    modules: {
        fSelfExclusionModule: {
            namespaced: true,
            state,
            actions,
            getters
        },
        hasModule: jest.fn(() => true)
    }
});

const $log = {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
};

export {
    createStore,
    i18n,
    $log
};
