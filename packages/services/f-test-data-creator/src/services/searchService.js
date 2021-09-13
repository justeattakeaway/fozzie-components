const SearchApiService = require('../clients/searchApi');

module.exports = class SearchService {
    constructor (configuration) {
        this.excludedRestaurantIds = configuration.excludedRestaurantIds,
        this.preferredRestaurantIds = configuration.PreferredRestaurants;
        this.searchApiService = new SearchApiService(configuration);
        this.postcode = configuration.Services.Search.Postcode;
        this.tenant = configuration.tenant;
    }

    async getAvailableRestaurants () {
        console.log(`Searching for restaurants in ${this.postcode} for tenant: ${this.tenant}`);
        const { data } = await this.searchApiService.getRestaurantsByPostcode(this.tenant, this.postcode);
        const result = data.Restaurants.find(restaurant => restaurant.Id === this.preferredRestaurantIds[0]);
        // throw an exception here if the result is null

        console.log('result of restaurant SEO and Id', result);

        return result;
    }
};
