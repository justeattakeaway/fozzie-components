import axios from 'axios';

export default {
    namespaced: true,

    state: () => ({
        id: '',
        serviceType: '',
        customer: {
            firstName: '',
            mobileNumber: ''
        },
        fulfilment: {
            times: [],
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
        messages: []
    }),

    actions: {
        /**
         * Get the checkout details from the backend and update the state.
         *
         * @param {Object} commit - Automatically handled by Vuex to be able to commit mutations.
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        getCheckout: async ({ commit }, payload) => {
            // TODO: deal with exceptions.
            const { url, tenant, timeout } = payload;

            const config = {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Tenant': tenant
                },
                timeout
            };

            const { data } = await axios.get(url, config);

            commit('updateState', data);
        },

        /**
         * Post the checkout details to the backend.
         *
         * @param {Object} commit - Automatically handled by Vuex to be able to commit mutations.
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        // eslint-disable-next-line no-unused-vars
        postCheckout: async ({ commit }, payload) => {
            // TODO: deal with exceptions and handle this action properly (when the functionality is ready)
            const {
                url, tenant, data, timeout
            } = payload;

            const config = {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Tenant': tenant
                },
                timeout
            };

            // eslint-disable-next-line no-unused-vars
            const response = await axios.post(url, data, config);
        }
    },

    mutations: {
        updateState: (state, {
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

            state.fulfilment.times = fulfilment.times;

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
        }
    }
};
