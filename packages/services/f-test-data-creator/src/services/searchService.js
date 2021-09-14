const SearchApiService = require('../clients/searchApi');

module.exports = class SearchService {
    constructor (configuration) {
        this.preferredRestaurantIds = configuration.PreferredRestaurants;
        this.searchApiService = new SearchApiService(configuration);
        this.postcode = configuration.Services.Search.Postcode;
        this.tenant = configuration.tenant;
    }

    async getPreferredRestaurants (serviceType) {
        console.log(`Attempting to get available restaurants in ${this.postcode} for tenant: ${this.tenant}`);

        const { data } = await this.searchApiService.getRestaurantsByPostcode(this.tenant, this.postcode);

        let result = data.Restaurants.filter(restaurant => this.preferredRestaurantIds.includes(restaurant.Id));

        if (result === undefined) {
            throw new Error('Unable to find a valid restaurant.');
        }

        result = serviceType === 'collection' ? result.find(restaurant => restaurant.IsCollection) : result.find(restaurant => restaurant.IsDelivery);

        console.log(`Successfully returned preferred restaurant: ${result.Id} with SEO Name ${result.UniqueName}`);

        return result;
    }
};
