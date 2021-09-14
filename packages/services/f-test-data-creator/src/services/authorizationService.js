const ConsumerApiService = require('../clients/consumerApi');
const PublicApiService = require('../clients/publicApi');

module.exports = class AuthorizationService {
    constructor (configuration) {
        this.environment = configuration.environment;
        this.consumerApiService = new ConsumerApiService(configuration);
        this.publicApiService = new PublicApiService(configuration);
    }

    async authorizeUserAsync (emailAddress, password, tenant) {
        console.log(`Attempting to authorize user in : ${this.environment} for tenant: ${tenant} with email address: ${emailAddress}`);

        let result;
        if (tenant === 'uk') {
            result = this.authorizeUserForUkAsync(emailAddress, password);
        } else {
            result = this.authorizeUserForIntAsync(emailAddress, password, tenant);
        }

        return result;
    }

    async authorizeUserForUkAsync (emailAddress, password) {
        const { data } = await this.publicApiService.getAuthCodeUk(emailAddress, password);

        console.log(`Successfully authorized UK user with auth token: ${data.access_token}`);

        return data.access_token;
    }

    async authorizeUserForIntAsync (emailAddress, password, tenant) {
        const { data } = await this.publicApiService.getAuthCodeInt(emailAddress, password, tenant);

        console.log(`Successfully authorized ${tenant} user with auth token: ${data.access_token}`);

        return data.access_token;
    }
};
