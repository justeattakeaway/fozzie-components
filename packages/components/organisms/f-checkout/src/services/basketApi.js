import axios from 'axios';
import retryWrapper from './axiosRetryWrapper';

export default {
    async getBasket (url, tenant, language, timeout) {
        retryWrapper(axios);
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
