const axios = require('axios');
const { getLanguageForTenant } = require('../configuration/tenants');

module.exports = class BasketServiceApi {
    constructor (configuration) {
        this.basketUrl = configuration.services.basket.baseAddress;
        this.recommendedBasketUrl = configuration.services.basket.recommendedBasket;
        this.tenant = configuration.tenant;
        this.postcode = configuration.services.search.postcode;
    }

    async createBasketForUserAsync (basketInfo, timeout = 5000) {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': getLanguageForTenant(this.tenant),
                'Accept-Tenant': this.tenant,
                Authorization: `Bearer ${basketInfo.authToken}`
            },
            timeout
        };

        const data = {
            restaurantSeoName: basketInfo.restaurantSEO,
            menuGroupId: basketInfo.menuId,
            serviceType: basketInfo.serviceType,
            orderDetails: {
                location: {
                    zipCode: this.postcode
                }
            },
            products: [{
                date: today.toISOString(),
                productId: basketInfo.productId,
                quantity: 2,
                modifierGroups: [],
                dealGroups: []
            }],
            deals: []
        };

        return axios.post(`${this.basketUrl}`, data, config)
        .catch(error => {
            throw new Error(error.message);
        });
    }
};


