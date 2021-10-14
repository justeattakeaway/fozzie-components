const axios = require('axios');
const { getLanguageForTenant } = require('../configuration/tenants');

module.exports = class BasketServiceApi {
    constructor (configuration) {
        this.basketUrl = configuration.services.basket.baseAddress;
        this.tenant = configuration.tenant;
        this.postcode = configuration.services.search.postcode;
    }

    async createBasketForUserAsync (basketInfo, timeout = 5000) {
        const today = new Date().toISOString();

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
            restaurantSeoName: basketInfo.restaurantSeo,
            menuGroupId: basketInfo.menuId,
            serviceType: basketInfo.serviceType,
            orderDetails: {
                location: {
                    zipCode: this.postcode
                }
            },
            products: [{
                date: today,
                productId: basketInfo.productId,
                quantity: 20,
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


