import axios from 'axios';

export default {
    namespaced: true,

    state: () => ({
        id: '',
        serviceType: '',
        customer: {
            firstName: '',
            lastName: '',
            email: '',
            mobileNumber: ''
        },
        fulfilment: {
            time: {
                from: '',
                to: ''
            },
            address: {
                line1: '',
                line2: '',
                city: '',
                postcode: ''
            }
        },
        notes: [],
        isFulfillable: true,
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
         * @param {Object} commit - Automatically handled by Vuex to be able to commit mutations.
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        getCheckout: async ({ commit, state }, { url, tenant, timeout }) => {
            const authHeader = state.authToken && `Bearer ${state.authToken}`;

            // TODO: deal with exceptions.
            const config = {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Tenant': tenant,
                    ...(state.isLoggedIn && {
                        Authorization: authHeader
                    })
                },
                timeout
            };

            const { data } = await axios.get(url, config);

            commit('UPDATE_STATE', data);
        },

        /**
         * Post the checkout details to the backend.
         *
         * @param {Object} commit - Automatically handled by Vuex to be able to commit mutations.
         * @param {Object} state - Automatically handled by Vuex to be able to retrieve state.
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        // eslint-disable-next-line no-unused-vars
        postCheckout: async ({ commit, state }, {
            url, tenant, data, timeout
        }) => {
            // TODO: deal with exceptions and handle this action properly (when the functionality is ready)
            const authHeader = state.authToken && `Bearer ${state.authToken}`;

            const config = {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Tenant': tenant,
                    ...(state.isLoggedIn && {
                        Authorization: authHeader
                    })
                },
                timeout
            };

            // eslint-disable-next-line no-unused-vars
            const response = await axios.post(url, data, config);
        },

        /**
         * Post the guest user details to the backend.
         *
         * @param {Object} commit - Automatically handled by Vuex to be able to commit mutations.
         * @param {Object} state - Automatically handled by Vuex to be able to retrieve state.
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        // eslint-disable-next-line no-unused-vars
        createGuestUser: async ({ commit, state }, {
            url, tenant, data, timeout
        }) => {
            const config = {
                method: 'post',
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
         * @param {Object} commit - Automatically handled by Vuex to be able to commit mutations.
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        getAvailableFulfilment: async ({ commit }, { url, tenant, timeout }) => {
            // TODO: deal with exceptions.
            const config = {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Tenant': tenant
                },
                timeout
            };

            const { data } = await axios.get(url, config);

            commit('UPDATE_AVAILABLE_FULFILMENT_TIMES', data);
        },

        setAuthToken: ({ commit }, authToken) => {
            commit('UPDATE_AUTH', authToken);
        },

        updateAddressDetails ({ commit }, payload) {
            commit('UPDATE_FULFILMENT_ADDRESS', payload);
        },

        updateCustomerDetails ({ commit }, payload) {
            commit('UPDATE_CUSTOMER_DETAILS', payload);
        }
    },

    mutations: {
        UPDATE_STATE: (state, {
            id,
            serviceType,
            customer,
            fulfilment,
            notes,
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

            state.fulfilment.time = fulfilment.time;

            if (fulfilment.address) {
                /* eslint-disable prefer-destructuring */
                state.fulfilment.address.line1 = fulfilment.address.lines[0];
                state.fulfilment.address.line2 = fulfilment.address.lines[1];
                state.fulfilment.address.city = fulfilment.address.lines[3];
                /* eslint-enable prefer-destructuring */

                state.fulfilment.address.postcode = fulfilment.address.postalCode;
            }

            state.notes = notes;
            state.isFulfillable = isFulfillable;
            state.notices = notices;
            state.messages = messages;
        },

        UPDATE_AVAILABLE_FULFILMENT_TIMES: (state, {
            times,
            asapAvailable
        }) => {
            state.availableFulfilment.times = times;
            state.availableFulfilment.isAsapAvailable = asapAvailable;
        },

        UPDATE_AUTH: (state, authToken) => {
            state.authToken = authToken;
            state.isLoggedIn = !!authToken;
        },

        UPDATE_FULFILMENT_ADDRESS (state, address) {
            state.fulfilment.address = {
                ...state.fulfilment.address,
                ...address
            };
        },

        UPDATE_CUSTOMER_DETAILS (state, customer) {
            state.customer = {
                ...state.customer,
                ...customer
            };
        }
    }
};
