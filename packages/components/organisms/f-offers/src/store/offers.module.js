import jwtDecode from 'jwt-decode';
import {
    MUTATION_SET_AUTH_TOKEN,
    MUTATION_SET_BRAZE_KEY,
    MUTATION_SET_CUSTOMER_DATA,
    ACTION_INITIALISE_OFFERS,
    ACTION_HANDLE_CUSTOMER_DATA
} from './types';

/**
 * @function resolveCustomerDetails
 * @param  {string} authToken - auth token.
 */
const resolveCustomerDetails = authToken => {
    const tokenData = jwtDecode(authToken);
    return {
        phoneNumber: (tokenData?.phone_number || tokenData?.mobile_number),
        firstName: tokenData?.given_name,
        lastName: tokenData?.family_name,
        globalUserId: tokenData?.global_user_id
    };
};

export default {
    namespaced: true,

    state: () => ({
        authToken: null,

        customer: {
            friendlyName: null,
            firstName: null,
            lastName: null
        },

        brazeApiKey: null,

        globalUserId: null
    }),

    actions: {
        /**
         * Gets the user data and commits to customer object in state
         * @param commit
         * @param state
         * @param url
         * @param timeout
         * @returns {Promise<void>}
         */
        [ACTION_HANDLE_CUSTOMER_DATA]: async ({ commit, state }) => {
            const customer = resolveCustomerDetails(state.authToken);
            commit(MUTATION_SET_CUSTOMER_DATA, customer);
        },

        /**
         * This action initialises the state while also calling the url /
         * endpoint to get customer data if isAuthenticated is true
         * @param commit
         * @param dispatch
         * @param getters
         * @param url
         * @param timeout
         * @param brazeApiKey
         * @param authToken
         * @returns {Promise<void>}
         */
        [ACTION_INITIALISE_OFFERS]: async ({ commit, dispatch, getters }, {
            brazeApiKey, authToken
        }) => {
            commit(MUTATION_SET_AUTH_TOKEN, authToken);

            commit(MUTATION_SET_BRAZE_KEY, brazeApiKey);

            if (getters.isAuthenticated) {
                await dispatch(ACTION_HANDLE_CUSTOMER_DATA);
            }
        }
    },

    mutations: {
        [MUTATION_SET_AUTH_TOKEN]: (state, value) => {
            state.authToken = value;
        },

        [MUTATION_SET_CUSTOMER_DATA]: (state, {
            friendlyName, firstName, lastName, globalUserId
        }) => {
            state.customer = {
                friendlyName,
                firstName,
                lastName
            };
            state.globalUserId = globalUserId;
        },

        [MUTATION_SET_BRAZE_KEY]: (state, value) => {
            state.brazeApiKey = value;
        }
    },

    getters: {
        isAuthenticated: state => !!state.authToken,
        friendlyName: state => state.customer.friendlyName
    }
};
