import axios from 'axios';

export default {
    async getData (url, tenant, data) {
        const config = {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Tenant': tenant
            },
            timeout: 1000
        };
        return axios
            .get(url, data, config);
    }
};
