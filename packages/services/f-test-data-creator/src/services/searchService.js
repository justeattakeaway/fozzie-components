const SearchApiService = require('../clients/searchApi');

module.exports = class SearchService {
    constructor (configuration) {
        this.excludedRestaurantIds = configuration.excludedRestaurantIds,
        this.preferredRestaurantIds = configuration.PreferredRestaurants;
        this.searchApiService = new SearchApiService(configuration);
        this.postcode = configuration.Services.Search.Postcode;
        this.tenant = configuration.tenant;
        this.restaurantId;
        this.restaurantSEO;
    }

    async getAvailableRestaurants() {
        console.log(`Searching for restaurants in ${this.postcode} for tenant: ${this.tenant}`);
        const { data } = await this.searchApiService.getRestaurantsByPostcode(this.tenant, this.postcode);
        const result = data.Restaurants.find(restaurant => restaurant.Id === this.preferredRestaurantIds[0]);
        // throw an exception here if the result is null
        
        this.restaurantId = result.Id;
        this.restaurantSEO = result.UniqueName;

        return `restaurant Id: ${this.restaurantId} and restaurant SEO: ${this.restaurantSEO}`;
    }
}