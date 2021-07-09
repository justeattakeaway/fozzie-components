import axios from 'axios';

export default {
    async getGeoLocation (url, postData, timeout, state) {
        const authHeader = state.authToken && `Bearer ${state.authToken}`;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: authHeader
            },
            timeout
        };

        return axios.post(url, postData, config);
    }
};
