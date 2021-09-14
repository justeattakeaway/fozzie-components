const MenuApiService = require('../clients/menuApi');

module.exports = class MenuService {
    constructor (configuration) {
        this.menuApiService = new MenuApiService(configuration);
    }

    async getMenuId (restaurantSEO) {
        console.log(`Attempting to get Menu Id for restaurant: ${restaurantSEO}`);

        const { data } = await this.menuApiService.getRestaurantManifest(restaurantSEO);

        console.log(`Successfully returned Menu Id: ${data.Menus[0].MenuGroupId}`);

        return data.Menus[0].MenuGroupId;
    }
};
