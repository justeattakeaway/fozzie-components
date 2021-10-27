import jwtDecode from 'jwt-decode';
import {
    MUTATION_SET_AUTH_TOKEN,
    MUTATION_SET_BRAZE_KEY,
    ACTION_INITIALISE_LOYALTY,
    ACTION_SET_GLOBAL_USER_ID,
    MUTATION_SET_GLOBAL_USER_ID
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
        globalUserId: null
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
        [ACTION_SET_GLOBAL_USER_ID]: ({ commit }, authToken) => {
            commit(ACTION_SET_GLOBAL_USER_ID, resolveGlobalUserID(authToken));
        },

        [ACTION_INITIALISE_LOYALTY]: ({ commit, dispatch }, {
            brazeApiKey, authToken
        }) => {
            commit(MUTATION_SET_AUTH_TOKEN, authToken);
            commit(MUTATION_SET_BRAZE_KEY, brazeApiKey);
            dispatch(ACTION_SET_GLOBAL_USER_ID, authToken);
        }
    },

    getters: {
        isAuthenticated: state => !!state.authToken,
    }
};
