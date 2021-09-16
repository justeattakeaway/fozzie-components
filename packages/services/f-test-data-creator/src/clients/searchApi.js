const axios = require('axios');
const { getLanguageForTenant } = require('../configuration/tenants');

module.exports = class SearchServiceApi {
    constructor (configuration) {
        this.searchApiBaseUrl = configuration.Services.Search.BaseAddress;
    }

    async getRestaurantsByPostcodeAsync (tenant, postcode, timeout = 5000) {
        const config = {
            headers: {
                'Accept-Language': getLanguageForTenant(tenant),
                'Accept-Tenant': tenant
            },
            timeout
        };

        return axios.get(`${this.searchApiBaseUrl}/${postcode}`, config)
        .catch(error => {
            throw new Error(error.message);
        });
    }
};

