/* eslint-disable camelcase */
const axios = require('axios');
const { getLanguageForTenant } = require('../configuration/tenants');

module.exports = class PublicServiceApi {
    constructor (configuration) {
        this.createUserUrl = configuration.Services.Public.CreateUserUrl;
        this.authorizationUrl = configuration.Services.Public.AuthorizationUrl;
        this.token = configuration.Services.Public.AuthorizationToken;
    }

    async createConsumerAsync (userInfo, timeout = 5000) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.token
            },
            timeout
        };

        const requestData = {
            registrationSource: 'Native',
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            password: userInfo.password,
            emailAddress: userInfo.emailAddress,
            tenant: userInfo.tenant
        };

        return axios.post(this.createUserUrl, requestData, config)
        .catch(error => {
            throw new Error(error.message);
        });
    }

    async getAuthCodeUkAsync (emailAddress, password, timeout = 5000) {
        const config = {
            headers: {
                Authorization: this.token
            },
            timeout
        };

        const params = {
            acr_values: 'tenant:uk language:en-GB',
            scope: 'openid mobile_scope offline_access',
            grant_type: 'password',
            username: emailAddress,
            password
        };

        // turns object into form-data for post request
        const searchParams = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');

        return axios.post(this.authorizationUrl, searchParams, config)
        .catch(error => {
            throw new Error(error.message);
        });
    }

    async getAuthCodeIntAsync (emailAddress, password, tenant, timeout = 5000) {
        const config = {
            headers: {
                Authorization: this.token
            },
            timeout
        };

        const params = {
            acr_values: `tenant:${tenant} language:${getLanguageForTenant(tenant)}`,
            scope: 'openid mobile_scope offline_access',
            grant_type: 'password',
            username: emailAddress,
            password
        };

        const searchParams = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');

        return axios.post(this.authorizationUrl, searchParams, config)
        .catch(error => {
            throw new Error(error.message);
        });
    }
};
