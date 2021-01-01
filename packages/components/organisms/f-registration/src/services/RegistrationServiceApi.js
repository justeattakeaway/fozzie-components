import axios from 'axios';

export default {
    async createAccount (url, tenant, data, timeout) {
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
