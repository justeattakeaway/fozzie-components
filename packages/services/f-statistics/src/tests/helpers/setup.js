/* eslint-disable camelcase */
import Vuex from 'vuex';
import Vue from 'vue';


const defaultState = {
    interval: null,
    queue: []
};

const log = {
    message: 'This is a message',
    payload: {
        alpha: 'alpha',
        beta: 'beta'
    }
};

const defaultActions = {};

const defaultGetters = {};

const defaultMutations = {};

const options = {
    namespace: 'f-statistics'
};
const basePayload = {
    je_feature: 'f-statistics',
    je_logType: 'client-stats',
    je_environment: 'test',
    je_feature_for: 'Generic Front End'
};

const createStore = ({
    name = options.namespace,
    state = {},
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
    createStore,
    options,
    log,
    basePayload
};
