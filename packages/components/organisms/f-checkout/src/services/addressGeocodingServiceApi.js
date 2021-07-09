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

        const { data } = await axios.post(url, postData, config);

        return data;
    }
};
