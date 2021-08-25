import axios from 'axios';

export default {
    async getAuthCode (baseUrl, timeout) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout
        };

        return axios.get(`${baseUrl}/applications/tokenweb/authorize`, config);
    }
};
