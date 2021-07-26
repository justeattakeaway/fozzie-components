import axios from 'axios';

export default {
    async isActivationAvailable (url) {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 10000
            };

            const { data } = await axios.get(url, config);
            return data.available;
        } catch (error) {
            return false;
        }
    },

    async activate (url, authToken, consumerId) {
        try {
            const authHeader = authToken && `Bearer ${authToken}`;

            const config = {
                headers: {
                    'Content-Type': 'application/json-patch+json',
                    ...(authToken && {
                        Authorization: authHeader
                    })
                },
                timeout: 10000
            };

            const request = {
                op: 'replace',
                path: '/consumer',
                value: {
                    id: consumerId
                }
            };

            const { status } = await axios.patch(url, request, config);
            return status === 200;
        } catch (error) {
            return false;
        }
    }
};
