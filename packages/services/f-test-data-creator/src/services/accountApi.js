import axios from 'axios';

export default {
    async createUser (baseUrl, data, timeout, tenant) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept-Tenant': tenant
            },
            timeout
        };

        return axios.post(`${baseUrl}/consumers/${this.tenant}`, data, config);
    }
};
