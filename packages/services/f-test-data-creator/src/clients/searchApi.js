const axios = require('axios');
const { getLanguageForTenant } = require('../tenants/tenants');

module.exports = class SearchApiService {
    constructor (configuration) {
        this.getRestaurantByPostcodeUrl = configuration.Services.Search.BaseAddress;
        // this.getRestaurantByLatLong = configuration.Services.Search.GetRestaurantByLatLong;
    }

    async getRestaurantsByPostcode (tenant, postcode, timeout = 5000) {
        const config = {
            headers: {
                'Accept-Language': getLanguageForTenant(tenant),
                'Accept-Tenant': tenant
            },
            timeout
        };

        return axios.get(`${this.getRestaurantByPostcodeUrl}/${postcode}`, config)
        .catch(error => {
            throw new Error(error.message);
        });
    }
};

