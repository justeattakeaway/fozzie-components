import axios from 'axios';
import { version as applicationVersion } from '../../package.json';

export default {
    async placeOrder (url, data, timeout, state) {
        const authHeader = state.authToken && `Bearer ${state.authToken}`;

        const config = {
            headers: {
                'Content-Type': 'application/json;v=2',
                'x-je-application-id': 7, // Responsive Web
                'x-je-application-version': applicationVersion,
                Authorization: authHeader
            },
            timeout
        };

        const response = await axios.post(url, data, config);

        return response;
    }
};
