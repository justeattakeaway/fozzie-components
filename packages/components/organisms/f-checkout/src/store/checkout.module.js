import axios from 'axios';

import {
    UPDATE_AUTH,
    UPDATE_AVAILABLE_FULFILMENT_TIMES,
    UPDATE_BASKET_DETAILS,
    UPDATE_CUSTOMER_DETAILS,
    UPDATE_FULFILMENT_ADDRESS,
    UPDATE_FULFILMENT_TIME,
    UPDATE_IS_FULFILLABLE,
    UPDATE_ISSUES,
    UPDATE_STATE,
    UPDATE_USER_NOTE
} from './mutation-types';

export default {
    namespaced: true,

    state: () => ({
        id: '',
        serviceType: '',
        restaurantId: '',
        basketTotal: 0,
        customer: {
            firstName: '',
            lastName: '',
            email: '',
            mobileNumber: ''
        },
        time: {
            from: '',
            to: ''
        },
        address: {
            line1: '',
            line2: '',
            city: '',
            postcode: ''
        },
        userNote: '',
        isFulfillable: true,
        issues: [],
        notices: [],
        messages: [],
        availableFulfilment: {
            times: [],
            isAsapAvailable: false
        },
        authToken: '',
        isLoggedIn: false
    }),

    actions: {
        /**
         * Get the checkout details from the backend and update the state.
         *
         * @param {Object} context - Vuex context object, this is the standard first parameter for actions.
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        getCheckout: async ({ commit, state }, { url, timeout }) => {
            const authHeader = state.authToken && `Bearer ${state.authToken}`;

            // TODO: deal with exceptions.
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    ...(state.isLoggedIn && {
                        Authorization: authHeader
                    })
                },
                timeout
            };

            const { data } = await axios.get(url, config);

            commit(UPDATE_STATE, data);
        },

        /**
         * Post the checkout details to the backend.
         *
         * @param {Object} context - Vuex context object, this is the standard first parameter for actions.
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        // eslint-disable-next-line no-unused-vars
        updateCheckout: async ({ commit, state }, {
            url, data, timeout
        }) => {
            // TODO: deal with exceptions and handle this action properly (when the functionality is ready)
            const authHeader = state.authToken && `Bearer ${state.authToken}`;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    ...(state.isLoggedIn && {
                        Authorization: authHeader
                    })
                },
                timeout
            };

            // TODO - Handle and log any errors
            const { data: responseData } = await axios.patch(url, data, config);
            const { issues, isFulfillable } = responseData;

            commit(UPDATE_IS_FULFILLABLE, isFulfillable);
            commit(UPDATE_ISSUES, issues);
        },

        /**
         * Post the guest user details to the backend.
         *
         * @param {Object} context - Vuex context object, this is the standard first parameter for actions
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        createGuestUser: async (context, {
            url, tenant, data, timeout
        }) => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Tenant': tenant
                },
                timeout
            };

            const response = await axios.post(url, data, config);
            // eslint-disable-next-line no-unused-vars
            const otac = response.data.token;
            // TODO: Use otac to log the user in
        },

        /**
         * Get the fulfilment details from the backend and update the state.
         *
         * @param {Object} context - Vuex context object, this is the standard first parameter for actions
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        getAvailableFulfilment: async ({ commit }, { url, timeout }) => {
            // TODO: deal with exceptions.
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout
            };

            const { data } = await axios.get(url, config);

            commit(UPDATE_AVAILABLE_FULFILMENT_TIMES, data);
        },

        /**
         * Get the basket details from the backend and update the state.
         *
         * @param {Object} context - Vuex context object, this is the standard first parameter for actions
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        getBasket: async ({ commit }, {
            url,
            tenant,
            language,
            timeout
        }) => {
            // TODO: deal with exceptions.
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Tenant': tenant,
                    'Accept-Language': language
                },
                timeout
            };

            const { data } = await axios.get(url, config);
            const basketDetails = {
                serviceType: data.ServiceType.toLowerCase(),
                restaurantId: data.RestaurantId,
                basketTotal: data.BasketSummary.BasketTotals.Total
            };

            commit(UPDATE_BASKET_DETAILS, basketDetails);
        },

        /**
         * Get the address details from the backend and update the state.
         *
         * @param {Object} context - Vuex context object, this is the standard first parameter for actions
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        getAddress: async ({ commit, state }, {
            url,
            language,
            timeout
        }) => {
            const authHeader = state.authToken && `Bearer ${state.authToken}`;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': language,
                    ...(state.isLoggedIn && {
                        Authorization: authHeader
                    })
                },
                timeout
            };

            const { data } = await axios.get(url, config);

            // TODO: Implement logic to select best address. For now, select the first address
            const [selectedAddress] = data.Addresses;

            const addressDetails = {
                line1: selectedAddress.Line1,
                line2: selectedAddress.Line2,
                city: selectedAddress.City,
                postcode: selectedAddress.ZipCode
            };

            commit(UPDATE_FULFILMENT_ADDRESS, addressDetails);
        },

        setAuthToken: ({ commit }, authToken) => {
            commit(UPDATE_AUTH, authToken);
        },

        updateAddressDetails ({ commit }, payload) {
            commit(UPDATE_FULFILMENT_ADDRESS, payload);
        },

        updateCustomerDetails ({ commit }, payload) {
            commit(UPDATE_CUSTOMER_DETAILS, payload);
        },

        updateFulfilmentTime ({ commit }, payload) {
            commit(UPDATE_FULFILMENT_TIME, payload);
        },

        updateUserNote ({ commit }, payload) {
            commit(UPDATE_USER_NOTE, payload);
        }
    },

    mutations: {
        [UPDATE_STATE]: (state, {
            id,
            serviceType,
            customer,
            address,
            time,
            isFulfillable,
            notices,
            messages
        }) => {
            state.id = id;
            state.serviceType = serviceType;

            if (customer) {
                state.customer.firstName = customer.firstName;
                state.customer.mobileNumber = customer.phoneNumber;
            }

            state.time = time;

            if (address) {
                /* eslint-disable prefer-destructuring */
                state.address.line1 = address.lines[0];
                state.address.line2 = address.lines[1];
                state.address.city = address.lines[3];
                /* eslint-enable prefer-destructuring */

                state.address.postcode = address.postalCode;
            }

            state.isFulfillable = isFulfillable;
            state.notices = notices;
            state.messages = messages;
        },

        [UPDATE_AUTH]: (state, authToken) => {
            state.authToken = authToken;
            state.isLoggedIn = !!authToken;
        },

        [UPDATE_AVAILABLE_FULFILMENT_TIMES]: (state, {
            times,
            asapAvailable
        }) => {
            state.availableFulfilment.times = times;
            state.availableFulfilment.isAsapAvailable = asapAvailable;
        },

        [UPDATE_BASKET_DETAILS]: (state, { serviceType }) => {
            state.serviceType = serviceType;
        },

        [UPDATE_CUSTOMER_DETAILS]: (state, customer) => {
            state.customer = {
                ...state.customer,
                ...customer
            };
        },

        [UPDATE_FULFILMENT_ADDRESS]: (state, address) => {
            state.address = {
                ...state.address,
                ...address
            };
        },

        [UPDATE_FULFILMENT_TIME]: (state, time) => {
            state.time = {
                ...state.time,
                ...time
            };
        },

        [UPDATE_IS_FULFILLABLE]: (state, isFulfillable) => {
            state.isFulfillable = isFulfillable;
        },

        [UPDATE_ISSUES]: (state, issues) => {
            state.issues = issues;
        },

        [UPDATE_USER_NOTE]: (state, userNote) => {
            state.userNote = userNote;
        }
    }
};
