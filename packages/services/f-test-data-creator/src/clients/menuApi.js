const axios = require('axios');

module.exports = class MenuServiceApi {
    constructor (configuration) {
        this.getMenuUrl = configuration.services.menu.baseAddress;
        this.tenant = configuration.tenant;
    }

    async getRestaurantManifestAsync (restaurantSeo, timeout = 5000) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout
        };

        return axios.get(`${this.getMenuUrl}/v2/${restaurantSeo}_${this.tenant}_manifest.json`, config)
        .catch(error => {
            throw new Error(error.message);
        });
    }
};
