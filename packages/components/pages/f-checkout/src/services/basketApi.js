import axios from 'axios';
import retryWrapper from '../axios-retry-wrapper';

export default {
    async getBasket (url, tenant, language, timeout) {
        retryWrapper(axios, { retryAmount: 3 });
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
