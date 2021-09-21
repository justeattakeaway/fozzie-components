const axios = require('axios');
const { getLanguageForTenant } = require('../configuration/tenants');

module.exports = class BasketServiceApi {
    constructor (configuration) {
        this.basketUrl = configuration.services.basket.baseAddress;
        this.tenant = configuration.tenant;
        this.postcode = configuration.services.search.postcode;
    }

    async createBasketForUserAsync (basketInfo, timeout = 5000) {
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
            Deals: [],
            MenuGroupId: basketInfo.menuId,
            OrderDetails: {
                Location: {
                    GeoLocation: {
                        Latitude: 0,
                        Longitude: 0
                    },
                    ZipCode: this.postcode
                }
            },
            Products: [],
            RestaurantSeoName: basketInfo.restaurantSEO,
            ServiceType: basketInfo.serviceType
        };

        return axios.post(`${this.basketUrl}`, data, config)
        .catch(error => {
            throw new Error(error.message);
        });
    }
};


