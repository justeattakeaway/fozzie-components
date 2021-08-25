import axios from 'axios';
import { ACCESS_TOKEN_REQUEST } from '../configuration/accessToken/getAccessToken';

export default {
    async getAccessToken (baseUrl, timeout, override) {
        const config = {
            headers: {
                'Content-Type': 'application/json' // potentially not needed
            },
            timeout
        };

        const data = {
            ...ACCESS_TOKEN_REQUEST,
            override
        };

        return axios.post(`${baseUrl}/applications/tokenweb/token`, data, config);
    }
};
