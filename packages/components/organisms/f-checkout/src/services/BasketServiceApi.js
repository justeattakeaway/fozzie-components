import axios from 'axios';

export default {
    async getBasket (url, tenant, language, timeout) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept-Tenant': tenant,
                'Accept-Language': language
            },
            timeout
        };

        const { data } = await axios.get(url, config);

        return data;
    }
};
