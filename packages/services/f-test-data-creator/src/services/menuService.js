const MenuServiceApi = require('../clients/menuApi');

module.exports = class MenuService {
    constructor (configuration) {
        this.menuServiceApi = new MenuServiceApi(configuration);
        this.menus = configuration.menus;
        this.products = configuration.productIds;
        this.items = configuration.itemIds;
    }

    async getMenuIdAsync (restaurantSEO, serviceType) {
        console.log(`Attempting to get Menu Id for restaurant: ${restaurantSEO}`);

        const { data } = await this.menuServiceApi.getRestaurantManifestAsync(restaurantSEO);

        const result = data.Menus.filter(menu => this.menus[serviceType].includes(menu.MenuGroupId));

        const products = result[0].Categories.filter(category => this.products[serviceType].includes(category.Id));

        if (products === undefined) {
            throw new Error(`No products available for ${serviceType}`);
        }

        if (result === undefined) {
            throw new Error(`No Menus available for ${serviceType}`);
        }

        const product = products[0].ItemIds.filter(id => this.items[serviceType].includes(id)).toString();

        console.log(`Successfully returned menu for service type: ${serviceType} and restaurant ${restaurantSEO}`);

        const menuResult = {
            productId: product,
            menuId: result[0].MenuGroupId
        };

        return menuResult;
    }
};
