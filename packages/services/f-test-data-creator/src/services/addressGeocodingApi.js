import axios from 'axios';

export default {
    async getGeoLocation (baseUrl, data, timeout, authToken) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken
            },
            timeout
        };

        return axios.post(`${baseUrl}/geocode/${this.tenant}`, data, config);
    }
};
