const MenuServiceApi = require('../clients/menuApi');

module.exports = class MenuService {
    constructor (configuration) {
        this.menuServiceApi = new MenuServiceApi(configuration);
        this.menus = configuration.menus;
    }

    async getMenuIdAsync (restaurantSEO, serviceType) {
        console.log(`Attempting to get Menu Id for restaurant: ${restaurantSEO}`);

        const { data } = await this.menuServiceApi.getRestaurantManifestAsync(restaurantSEO);

        const result = data.Menus.filter(menu => this.menus[serviceType].includes(menu.MenuGroupId));

        if (result === undefined) {
            throw new Error(`No Menus available for ${serviceType}`);
        }

        console.log(`Successfully returned menu for service type: ${serviceType} and restaurant ${restaurantSEO}`);

        return result[0];
    }
};
