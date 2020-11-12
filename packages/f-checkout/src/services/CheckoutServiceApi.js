import axios from 'axios';

export default {
    async submitCheckout (url, tenant, data, timeout) {
        const config = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Tenant': tenant
            },
            timeout
        };
        return axios
            .post(url, data, config);
    }
};
