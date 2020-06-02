import axios from 'axios';

export default {
    async createAccount (url, tenant, data) {
        const config = {
            method: 'post',
            url,
            data,
            headers: {
                'Content-Type': 'application/json',
                'Accept-Tenant': tenant
            }
        };
        return axios
            .post(config);
    }
};
