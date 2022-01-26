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
    log
};
