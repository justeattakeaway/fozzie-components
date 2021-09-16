// const ConsumerApiService = require('../clients/consumerApi');
const PublicServiceApi = require('../clients/publicApi');

module.exports = class AuthorizationService {
    constructor (configuration) {
        this.environment = configuration.environment;
        this.publicServiceApi = new PublicServiceApi(configuration);
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
        const { data } = await this.publicServiceApi.getAuthCodeUkAsync(emailAddress, password);

        console.log(`Successfully authorized UK user with auth token: ${data.access_token}`);

        return data.access_token;
    }

    async authorizeUserForIntAsync (emailAddress, password, tenant) {
        const { data } = await this.publicServiceApi.getAuthCodeIntAsync(emailAddress, password, tenant);

        console.log(`Successfully authorized ${tenant} user with auth token: ${data.access_token}`);

        return data.access_token;
    }
};
