import axios from 'axios';

export default {
    async getData (url, tenant, timeout) {
        const config = {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Tenant': tenant
            },
            timeout
        };
        return axios
            .get(url, config);
    }
};
