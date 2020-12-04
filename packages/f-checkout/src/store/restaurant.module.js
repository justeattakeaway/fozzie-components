import axios from 'axios';

export default {
    namespaced: true,

    state: () => ({
        name: '',
        allergenInformation: {
            phoneNumber: '',
            url: ''
        }
    }),

    actions: {
        /**
         * Get the restaurant details update the state.
         *
         * @param {Object} commit - Automatically handled by Vuex to be able to commit mutations.
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        getRestaurant: async ({ commit }, payload) => {
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
        }
    },

    mutations: {
        updateState: (state, {
            name,
            allergenInformation
        }) => {
            state.name = name;
            state.allergenInformation.phoneNumber = allergenInformation.phoneNumber;
            state.allergenInformation.url = allergenInformation.url;
        }
    },

    getters: {
        isMcDonalds: ({ name }) => /^mcdonald's/i.test(name) // TODO: this should come from an API, but MenuWeb does something similar because there's no endpoint at the moment.
    }
};
