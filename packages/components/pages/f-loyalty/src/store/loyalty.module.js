import jwtDecode from 'jwt-decode';
import {
    MUTATION_SET_AUTH_TOKEN,
    MUTATION_SET_BRAZE_KEY,
    ACTION_INITIALISE_LOYALTY,
    ACTION_SET_GLOBAL_USER_ID,
    MUTATION_SET_GLOBAL_USER_ID,
    MUTATION_SET_TENANT,
    MUTATION_SET_API_URL,
    MUTATION_SET_ADAPTER_EXPERIMENT
} from './types';

/**
 * @function resolveGlobalUserID
 * @param  {string} authToken - auth token.
 */
const resolveGlobalUserID = authToken => {
    const tokenData = jwtDecode(authToken);
    return tokenData?.global_user_id;
};

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

        [MUTATION_SET_BRAZE_KEY]: (state, value) => {
            state.brazeApiKey = value;
        },

        [MUTATION_SET_GLOBAL_USER_ID]: (state, value) => {
            state.globalUserId = value;
        },

        [MUTATION_SET_TENANT]: (state, value) => {
            state.tenant = value;
        },

        [MUTATION_SET_API_URL]: (state, value) => {
            state.stampCardsAPIUrl = value;
        },

        [MUTATION_SET_ADAPTER_EXPERIMENT]: (state, value) => {
            state.inStampCardsAdapterExperiment = value;
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
        [ACTION_SET_GLOBAL_USER_ID]: ({ commit }, { authToken, logger, errorHandler }) => {
            commit(ACTION_SET_GLOBAL_USER_ID, resolveGlobalUserID(authToken, logger, errorHandler));
        },

        [ACTION_INITIALISE_LOYALTY]: ({ commit, dispatch, getters }, {
            brazeApiKey,
            authToken,
            tenant,
            stampCardsAPIUrl,
            inStampCardsAdapterExperiment
        }) => {
            commit(MUTATION_SET_AUTH_TOKEN, authToken);
            commit(MUTATION_SET_BRAZE_KEY, brazeApiKey);
            commit(MUTATION_SET_TENANT, tenant);
            commit(MUTATION_SET_API_URL, stampCardsAPIUrl);
            commit(MUTATION_SET_ADAPTER_EXPERIMENT, inStampCardsAdapterExperiment);
            if (getters.isAuthenticated) {
                dispatch(ACTION_SET_GLOBAL_USER_ID, { authToken });
            }
        }
    },

    getters: {
        isAuthenticated: state => !!state.authToken
    }
};
