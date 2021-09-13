const ConsumerApiService = require('../clients/consumerApi');
const PublicApiService = require('../clients/publicApi');
const { getLanguageForTenant } = require('../tenants/tenants');

module.exports = class AuthorizationService {
    constructor (configuration) {
        this.environment = configuration.environment,
        this.consumerApiService = new ConsumerApiService(configuration);
        this.publicApiService = new PublicApiService(configuration);
        this.accessToken = '';
    }

    async authorizeUserAsync (emailAddress, password, tenant) {
        console.log(`Authorizing user in ${this.environment} for tenant: ${tenant} with email address: ${emailAddress}`);
        if (tenant === 'uk') {
            return this.authorizeUserForUkAsync(emailAddress, password);
        }
        return this.authorizeUserForIntAsync(emailAddress, password, tenant);
    }

    async authorizeUserForUkAsync (emailAddress, password) {
        const params = {
            acr_values: 'tenant:uk language:en-GB',
            scope: 'openid mobile_scope offline_access',
            grant_type: 'password',
            username: emailAddress,
            password
        };

        const { data } = await this.publicApiService.getAuthCodeUk(params);

        this.accessToken = data.access_token;

        return this.accessToken;
    }

    async authorizeUserForIntAsync (emailAddress, password, tenant) {
        const params = {
            acr_values: `tenant:${tenant} language:${getLanguageForTenant(tenant)}`,
            scope: 'openid mobile_scope offline_access',
            grant_type: 'password',
            username: emailAddress,
            password
        };

        const { data } = await this.publicApiService.getAuthCodeInt(params);

        this.accessToken = data.access_token;

        return this.accessToken;
    }
};
