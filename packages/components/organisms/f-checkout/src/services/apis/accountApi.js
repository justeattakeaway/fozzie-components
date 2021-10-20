import axios from 'axios';

export default {
    async createGuestUser (url, getApiConfig, getRequestData) {
        const { timeout, tenant } = getApiConfig(['timeout', 'tenant']);
        const data = getRequestData(['emailAddress', 'firstName', 'lastName', 'registrationSource']);

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
