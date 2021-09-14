const BasketApiService = require('../clients/basketApi');

module.exports = class BasketService {
    constructor (configuration) {
        this.basketApi = new BasketApiService(configuration);
    }

    async createBasket (basketInfo) {
        console.log(`Attempting to create basket for menu Id: ${basketInfo.menuId} and restaurant Id ${basketInfo.restaurantSEO}.`);

        const { data } = await this.basketApi.createBasketForUser(basketInfo);

        console.log(`Successfully created basket: ${data.BasketId}`);

        return data.BasketId;
    }
};
