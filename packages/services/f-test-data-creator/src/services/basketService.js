const BasketApi = require('../clients/basketApi');

module.exports = class BasketService {
    constructor (configuration, emailAddress) {
        this.tenant = configuration.tenant;
        this.postcode = configuration.Services.Search.Postcode;
        this.basketApi = new BasketApi(configuration);
        this.emailAddress = emailAddress;
    }

    async createBasket(token, serviceType, menuId, restaurantSEO) {
        console.log(`Returning basket Id for menu Id: ${menuId} and restaurant Id ${restaurantSEO}. For tenant: ${this.tenant} and with ${this.postcode}`);

        const { data } = await this.basketApi.createBasketForUser(this.tenant, token, serviceType, menuId, restaurantSEO, this.postcode);

        return data.BasketId
    }
}
