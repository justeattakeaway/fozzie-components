import axios from 'axios';

export default {
    async createAccount (url, tenant, data) {
        const config = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Tenant': tenant
            }
        };
        return axios
            .post(url, data, config);
    }
};
