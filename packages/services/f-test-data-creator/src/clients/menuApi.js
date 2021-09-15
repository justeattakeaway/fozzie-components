const axios = require('axios');

module.exports = class MenuApiService {
    constructor (configuration) {
        this.getMenuUrl = configuration.Services.Menu.BaseAddress;
        this.tenant = configuration.Tenant;
    }

    async getRestaurantManifest (restaurantSEO, timeout = 5000) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout
        };

        return axios.get(`${this.getMenuUrl}/v2/${restaurantSEO}_${this.tenant}_manifest.json`, config)
        .catch(error => {
            throw new Error(error.message);
        });
    }
};
