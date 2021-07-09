import axios from 'axios';

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

        const { data } = await axios.get(url, config);

        return data;
    },


    async updateCheckout (url, state, data, timeout) {
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

        const { data: responseData } = await axios.patch(url, data, config);

        return responseData;
    },

    async getAvailableFulfilment (url, timeout) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout
        };

        const { data } = await axios.get(url, config);

        return data;
    }
};



