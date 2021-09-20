const SearchServiceApi = require('../clients/searchApi');

module.exports = class SearchService {
    constructor (configuration) {
        this.preferredRestaurantIds = configuration.preferredRestaurants;
        this.searchServiceApi = new SearchServiceApi(configuration);
        this.postcode = configuration.services.search.postcode;
        this.tenant = configuration.tenant;
    }

    async getPreferredRestaurantsAsync (serviceType) {
        console.log(`Attempting to get available restaurants in ${this.postcode} for tenant: ${this.tenant}`);

        const { data } = await this.searchServiceApi.getRestaurantsByPostcodeAsync(this.tenant, this.postcode);

        let result = data.Restaurants.filter(restaurant => this.preferredRestaurantIds.includes(restaurant.Id) || restaurant.CollectionMenuId != null || restaurant.DeliveryMenuId != null);
        if (result === undefined) {
            throw new Error('Unable to find a valid restaurant.');
        }

        result = serviceType === 'Collection' ? result.find(restaurant => restaurant.IsCollection) : result.find(restaurant => restaurant.IsDelivery);

        console.log(`Successfully returned preferred restaurant: ${result.Id} with SEO Name ${result.UniqueName}`);

        return result;
    }
};
