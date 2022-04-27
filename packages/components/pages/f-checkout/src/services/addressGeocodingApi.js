import axios from 'axios';
import retryWrapper from '../axios-retry-wrapper';

export default {
    retryWrapper(axios, { retryAmount: 3 });
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
