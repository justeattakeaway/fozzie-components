const MenuServiceApi = require('../clients/menuApi');

module.exports = class MenuService {
    constructor (configuration) {
        this.menuServiceApi = new MenuServiceApi(configuration);
        this.configuration = configuration;
        this.menus = configuration.menus;
        this.products = configuration.productIds;
        this.items = configuration.itemIds;
    }

    async getMenuItemsAsync (restaurantSeo, serviceType) {
        console.log(`Attempting to get menu items for restaurant: ${restaurantSeo}`);

        const { data } = await this.menuServiceApi.getRestaurantManifestAsync(restaurantSeo);

        const result = data.Menus.filter(menu => this.menus[serviceType].includes(menu.MenuGroupId));

        if (result === undefined) {
            throw new Error(`No menus available for ${serviceType}`);
        }

        const products = result[0].Categories.filter(category => this.products[serviceType].includes(category.Id));

        if (products === undefined) {
            throw new Error(`No products available for ${serviceType}`);
        }

        const product = products[0].ItemIds.find(id => this.items[serviceType].includes(id)).toString();

        console.log(`Successfully returned menu items for service type: ${serviceType} and restaurant ${restaurantSeo}`);

        const menuResult = {
            productId: product,
            menuId: result[0].MenuGroupId
        };

        return menuResult;
    }
};
