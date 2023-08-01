import {
    MUTATION_SET_AUTH_TOKEN,
    ACTION_INITIALISE_LOYALTY,
    MUTATION_SET_TENANT,
    MUTATION_SET_API_URL
} from './types';

export default {
    namespaced: true,

    state: () => ({
        authToken: null,
        brazeApiKey: null,
        globalUserId: null,
        tenant: null,
        stampCardsAPIUrl: null
    }),

    mutations: {
        [MUTATION_SET_AUTH_TOKEN]: (state, value) => {
            state.authToken = value;
        },

        [MUTATION_SET_TENANT]: (state, value) => {
            state.tenant = value;
        },

        [MUTATION_SET_API_URL]: (state, value) => {
            state.stampCardsAPIUrl = value;
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
            authToken,
            tenant,
            stampCardsAPIUrl
        }) => {
            commit(MUTATION_SET_AUTH_TOKEN, authToken);
            commit(MUTATION_SET_TENANT, tenant);
            commit(MUTATION_SET_API_URL, stampCardsAPIUrl);
        }
    },

    getters: {
        isAuthenticated: state => !!state.authToken
    }
};
