import axios from 'axios';

export default {
    async getBasket (url, getApiConfig) {
        const { timeout, tenant, language } = getApiConfig(['timeout', 'tenant', 'language']);

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept-Tenant': tenant,
                'Accept-Language': language
            },
            timeout
        };

        return axios.get(url, config);
    }
};
