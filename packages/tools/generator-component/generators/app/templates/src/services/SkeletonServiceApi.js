import axios from 'axios';

export default {
    async dummyService (url, tenant, data) {
        const config = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Tenant': tenant
            },
            timeout: 1000
        };
        return axios
            .post(url, data, config);
    }
};
