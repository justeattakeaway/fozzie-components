import axios from 'axios';

export default {
    async createGuestUser (url, data, timeout, tenant) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept-Tenant': tenant
            },
            timeout
        };

        return axios.post(url, data, config);
    }
};
