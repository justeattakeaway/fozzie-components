const axios = require('axios');
const { getLanguageForTenant } = require('../tenants/tenants');

module.exports = class BasketApi {
    constructor (configuration) {
        this.basketUrl = configuration.Services.Basket.BaseAddress;
    }

    async createBasketForUser (tenant, token, serviceType, menuId, restaurantSEO, postcode, timeout = 5000) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': 'en-GB',
                // 'Accept-Language': getLanguageForTenant(tenant),
                'Accept-Tenant': tenant,
                Authorization: `Bearer ${token}`
            },
            timeout
        };

        console.log('here is the header', config.headers)

        const data = {
                Deals: [],
                MenuGroupId: menuId,
                OrderDetails: {
                  Location: {
                    GeoLocation: {
                      Latitude: 0,
                      Longitude: 0
                    },
                    ZipCode: postcode
                  }
                },
                Products: [],
                RestaurantSeoName: restaurantSEO,
                ServiceType: serviceType
        };

        return axios.post(`${this.basketUrl}`, data, config)
        .catch(error => {
            console.log('there is an error', error);
        });
    }

    async getBasket (basketId, timeout = 5000) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.token
            },
            timeout
        };

        return axios.get(`${this.basketUrl}/${basketId}`, config)
        .catch(error => {
            // throw new Error(error.message);
            console.log('hey', error);
        });
    }

    // async updateBasket (basketId, timeout = 5000) {
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: this.token
    //         },
    //         timeout
    //     };

    //     const basketInfo = {
    //         ...BASKET_REQUEST,
    //         serviceType,
    //         menuGroupId
    //     };

    //     return axios.put(`${this.basketUrl}/${basketId}`, basketInfo, config)
    //     .catch(error => {
    //         throw new Error(error.message);
    //     });
    // }
}


