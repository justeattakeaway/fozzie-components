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
        fulfillment: {
            time: {},
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
        postCheckout: async (payload) => {
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
            restaurant,
            serviceType,
            customer,
            fulfilment,
            notes,
            isFulfillable,
            notices,
            messages
        }) => {
            state.id = restaurant.id;
            state.serviceType = serviceType;

            if (customer) {
                state.customer.firstName = customer.firstName;
                state.customer.mobileNumber = customer.phoneNumber;
            }

            state.fulfillment.time = fulfilment.time;

            if (fulfilment.address) {
                /* eslint-disable prefer-destructuring */
                state.fulfillment.address.line1 = fulfilment.address.lines[0];
                state.fulfillment.address.line2 = fulfilment.address.lines[1];
                state.fulfillment.address.city = fulfilment.address.lines[3];
                /* eslint-enable prefer-destructuring */

                state.fulfillment.address.postcode = fulfilment.address.postalCode;
            }

            state.notes = notes;
            state.isFulfillable = isFulfillable;
            state.notices = notices;
            state.messages = messages;
        }
    }
};
