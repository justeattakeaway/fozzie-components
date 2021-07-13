import axios from 'axios';
import { VUEX_CHECKOUT_EXPERIMENTATION_MODULE } from '../constants';

export default {
    async getCheckout (url, state, timeout) {
        const authHeader = state.authToken && `Bearer ${state.authToken}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(state.authToken && {
                    Authorization: authHeader
                })
            },
            timeout
        };

        return axios.get(url, config);
    },


    async updateCheckout (url, state, rootGetters, data, timeout) {
        const authHeader = state.authToken && `Bearer ${state.authToken}`;
        const experimentationHeaders = rootGetters[`${VUEX_CHECKOUT_EXPERIMENTATION_MODULE}/getExperimentsHeaders`];
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(state.authToken && {
                    Authorization: authHeader
                }),
                ...experimentationHeaders
            },
            timeout
        };

        return axios.patch(url, data, config);
    },

    async getAvailableFulfilment (url, timeout) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout
        };

        return axios.get(url, config);
    }
};



