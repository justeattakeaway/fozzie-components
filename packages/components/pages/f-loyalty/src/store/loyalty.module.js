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
 * @param logger
 */
const resolveGlobalUserID = (authToken, logger) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const tokenData = jwtDecode(authToken);
        return tokenData?.global_user_id;
    } catch (error) {
        logger.error(
            'Error Decoding JWT token',
            error,
            'loyalty',
            {
                authToken,
                exception: error.name,
                exceptionMessage: error.message,
                exceptionStackTrace: error.stack,
                traceId: error.traceId || (error.response && error.response.data.traceId),
                errorCode: error.errorCode
            }
        );
        throw error;
    }
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
        [ACTION_SET_GLOBAL_USER_ID]: ({ commit }, { authToken, logger }) => {
            commit(ACTION_SET_GLOBAL_USER_ID, resolveGlobalUserID(authToken, logger));
        },

        [ACTION_INITIALISE_LOYALTY]: ({ commit, dispatch }, {
            brazeApiKey, authToken, log
        }) => {
            commit(MUTATION_SET_AUTH_TOKEN, authToken);
            commit(MUTATION_SET_BRAZE_KEY, brazeApiKey);
            dispatch(ACTION_SET_GLOBAL_USER_ID, { authToken, log });
        }
    },

    getters: {
        isAuthenticated: state => !!state.authToken
    }
};
