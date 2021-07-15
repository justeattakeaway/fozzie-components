import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {
    MUTATION_SET_AUTH_TOKEN,
    MUTATION_SET_BRAZE_KEY,
    MUTATION_SET_CUSTOMER_DATA,
    ACTION_INITIALISE_OFFERS,
    ACTION_HANDLE_CUSTOMER_DATA
} from './types';

/**
 * Setup the config for axios
 * @param authHeader
 * @param timeout
 * @returns {{headers: {Authorization, "Content-Type": string}, timeout}}
 */
const createAxiosConfig = (authHeader, timeout) => ({
    headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader
    },
    timeout
});

/**
 * @function resolveCustomerDetails
 * @param  {object} data  - Api response object.
 * @param  {string} authToken - auth token.
 */
const resolveCustomerDetails = (data, authToken) => {
    const tokenData = jwtDecode(authToken);
    return {
        phoneNumber: data?.customer?.phoneNumber ? data?.customer?.phoneNumber :
            (tokenData?.phone_number || tokenData?.mobile_number),
        firstName: data?.customer?.firstName ? data?.customer?.firstName : tokenData?.given_name,
        lastName: data?.customer?.lastName ? data?.customer?.lastName : tokenData?.family_name
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

        brazeApiKey: null
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
        [ACTION_HANDLE_CUSTOMER_DATA]: async ({ commit, state }, { url, timeout }) => {
            const authHeader = `Bearer ${state.authToken}`;

            const config = createAxiosConfig(authHeader, timeout);

            const { data } = await axios.get(url, config);

            const customer = resolveCustomerDetails(data);

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
            url, timeout, brazeApiKey, authToken
        }) => {
            commit(MUTATION_SET_AUTH_TOKEN, authToken);

            commit(MUTATION_SET_BRAZE_KEY, brazeApiKey);

            if (getters.isAuthenticated) {
                await dispatch(ACTION_HANDLE_CUSTOMER_DATA, { url, timeout });
            }
        }
    },

    mutations: {
        [MUTATION_SET_AUTH_TOKEN]: (state, value) => {
            state.authToken = value;
        },

        [MUTATION_SET_CUSTOMER_DATA]: (state, { friendlyName, firstName, lastName }) => {
            state.customer = {
                friendlyName,
                firstName,
                lastName
            };
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
