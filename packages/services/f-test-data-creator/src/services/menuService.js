const MenuServiceApi = require('../clients/menuApi');

module.exports = class MenuService {
    constructor (configuration) {
        this.menuServiceApi = new MenuServiceApi(configuration);
        this.configuration = configuration;
        this.menus = configuration.menus;
        this.products = '';
        this.items = '';
    }

    async getMenuItemsAsync (restaurantSEO, serviceType) {
        console.log(`Attempting to get menu items for restaurant: ${restaurantSEO}`);

        const { data } = await this.menuServiceApi.getRestaurantManifestAsync(restaurantSEO);

        const today = new Date();
        const time = today.getHours();

        const result = data.Menus.filter(menu => this.menus[serviceType].includes(menu.MenuGroupId));

        if (result === undefined) {
            throw new Error(`No menus available for ${serviceType}`);
        }

        this.products = parseInt(time, 10) < 12 ? this.configuration.preLunchProductIds : this.configuration.postLunchProductIds;
        this.items = parseInt(time, 10) < 12 ? this.configuration.preLunchItemIds : this.configuration.postLunchItemIds;

        const products = result[0].Categories.filter(category => this.products[serviceType].includes(category.Id));

        if (products === undefined) {
            throw new Error(`No products available for ${serviceType}`);
        }

        const product = products[0].ItemIds.filter(id => this.items[serviceType].includes(id)).toString();

        console.log(`Successfully returned menu items for service type: ${serviceType} and restaurant ${restaurantSEO}`);

        const menuResult = {
            productId: product,
            menuId: result[0].MenuGroupId
        };

        return menuResult;
    }
};
