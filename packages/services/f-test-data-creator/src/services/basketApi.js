import axios from 'axios';
import { BASKET_REQUEST } from '../configuration/basketApi/createBasketRequest';

export default {
    async createBasket (baseUrl, authToken, menuGroupId, serviceType, timeout) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken
            },
            timeout
        };

        const data = {
            ...BASKET_REQUEST,
            serviceType,
            menuGroupId
        };

        return axios.post(`${baseUrl}/basket`, data, config);
    }
};
