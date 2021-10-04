const BasketServiceApi = require('../clients/basketApi');

module.exports = class BasketService {
    constructor (configuration) {
        this.basketServiceApi = new BasketServiceApi(configuration);
    }

    async createBasketAsync (basketInfo) {
        console.log(`Attempting to create basket for menu Id: ${basketInfo.menuId} and restaurant Id ${basketInfo.restaurantId}.`);

        const { data } = await this.basketServiceApi.createBasketForUserAsync(basketInfo);

        console.log(`Successfully created basket: ${data.BasketId}`);

        return data.BasketId;
    }

    async getProductsAsync (basketInfo) {
        console.log(`Attempting to create basket for menu Id: ${basketInfo.menuId} and restaurant Id ${basketInfo.restaurantId}.`);

        const { data } = await this.basketServiceApi.chooseProductsForUser(basketInfo);

        console.log(`Successfully created basket: ${data.BasketId}`);

        return data.BasketId;
    }
};
