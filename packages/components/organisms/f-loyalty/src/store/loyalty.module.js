import { MUTATION_SET_AUTH_TOKEN, MUTATION_SET_BRAZE_KEY, ACTION_INITIALISE_LOYALTY } from './types';

export default {
    namespaced: true,

    state: () => ({
        authToken: null,
        brazeApiKey: null
    }),

    mutations: {
        [MUTATION_SET_AUTH_TOKEN]: (state, value) => {
            state.authToken = value;
        },

        [MUTATION_SET_BRAZE_KEY]: (state, value) => {
            state.brazeApiKey = value;
        }
    },

    /**
     * This action initialises the state
     * @param commit
     * @param brazeApiKey
     * @param authToken
     * @returns {void}
     */
    actions: {
        [ACTION_INITIALISE_LOYALTY]: ({ commit }, {
            brazeApiKey, authToken
        }) => {
            commit(MUTATION_SET_AUTH_TOKEN, authToken);

            commit(MUTATION_SET_BRAZE_KEY, brazeApiKey);
        }
    },

    getters: {
        isAuthenticated: state => !!state.authToken
    }
};
