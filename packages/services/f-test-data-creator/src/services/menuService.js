// const { getLanguageForTenant } = require('../tenants/tenants');
const MenuApiService = require('../clients/menuApi');

module.exports = class MenuService {
    constructor (configuration) {
        this.menuApiService = new MenuApiService(configuration);
        this.tenant = configuration.tenant;
        this.menuId = '';
    }

    async getMenuId(restaurantSEO) {
        console.log(`Returning Menu Id for restaurant: ${restaurantSEO}`)

        const { data } = await this.menuApiService.getRestaurantManifest(restaurantSEO, this.tenant)

        this.menuId = data.Menus[0].MenuGroupId;

        console.log('hellooo', this.menuId);

        return this.menuId;
    }

}