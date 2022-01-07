import axios from 'axios';
import { VUEX_CHECKOUT_EXPERIMENTATION_MODULE } from '../constants';

export default {
    async getCheckout (url, state, timeout) {
        const authHeader = state.authToken && `Bearer ${state.authToken}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json;v=2',
                ...(state.authToken && {
                    Authorization: authHeader
                })
            },
            timeout
        };

        return axios.get(url, config);
    },


    async updateCheckout (request) {
        const authHeader = request.state.authToken && `Bearer ${request.state.authToken}`;
        const experimentationHeaders = request.rootGetters[`${VUEX_CHECKOUT_EXPERIMENTATION_MODULE}/getExperimentsHeaders`];
        const config = {
            headers: {
                ...(request.state.notesConfiguration?.isSplitNotesEnabled && {
                    'Content-Type': 'application/json-patch+json;v=2'
                }),
                ...(request.state.authToken && {
                    Authorization: authHeader
                }),
                ...experimentationHeaders
            },
            timeout: request.timeout
        };

        return axios.patch(request.url, request.data, config);
    },

    async getAvailableFulfilment (url, timeout) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout
        };

        return axios.get(url, config);
    },

    async getNoteConfiguration (url, timeout) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout
        };

        return axios.get(url, config);
    }
};
