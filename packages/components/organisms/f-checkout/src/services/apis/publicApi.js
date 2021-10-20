import axios from 'axios';

export default {
    async getAddress (url, getApiConfig) {
        const { language, authToken, timeout } = getApiConfig(['language', 'authToken', 'timeout']);

        const authHeader = authToken && `Bearer ${authToken}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': language,
                ...(authToken && {
                    Authorization: authHeader
                })
            },
            timeout
        };

        return axios.get(url, config);
    },

    async getCustomer (url, getApiConfig) {
        const { authToken, timeout } = getApiConfig(['authToken', 'timeout']);

        const authHeader = authToken && `Bearer ${authToken}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(authToken && {
                    Authorization: authHeader
                })
            },
            timeout
        };

        return axios.get(url, config);
    }
};
