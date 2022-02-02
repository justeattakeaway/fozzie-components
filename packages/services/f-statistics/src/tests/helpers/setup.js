/* eslint-disable camelcase */
import Vuex from 'vuex';
import Vue from 'vue';
import {
    ADD_LOG, CLEAR_LOGS
} from '../../store/mutation-types';

const defaultState = {
    logs: []
};

const log = {
    message: 'This is a message',
    payload: {
        alpha: 'alpha',
        beta: 'beta'
    }
};

const options = {
    namespace: 'f-statistics'
};
const basePayload = {
    je_feature: 'f-statistics',
    je_logType: 'client-stats',
    je_environment: 'test',
    je_feature_for: 'Generic Front End'
};

const defaultActions = {
    addLog: jest.fn()
};

const defaultGetters = {};

const defaultMutations = {
    [ADD_LOG]: jest.fn(),
    [CLEAR_LOGS]: jest.fn()
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
    options,
    log,
    basePayload,
    createStore
};
