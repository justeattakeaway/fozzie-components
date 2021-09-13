const axios = require('axios');

module.exports = class PublicApiService {
    constructor (configuration) {
        this.createUserUrl = configuration.Services.Public.CreateUserUrl;
        this.authorizationUrl = configuration.Services.Public.AuthorizationUrl;
        this.token = configuration.Services.Public.AuthorizationToken;
    }

    async createConsumer (userInfo, timeout = 5000) {
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

    async getAuthCodeUk (params, timeout = 5000) {
        const config = {
            headers: {
                Authorization: this.token
            },
            timeout
        };

        const searchParams = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');

        return axios.post(this.authorizationUrl, searchParams, config)
        .catch(error => {
            throw new Error(error.message);
        });
    }

    async getAuthCodeInt (params, timeout = 5000) {
        const config = {
            headers: {
                Authorization: this.token
            },
            timeout
        };

        const searchParams = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');

        return axios.post(this.authorizationUrl, searchParams, config)
        .catch(error => {
            throw new Error(error.message);
        });
    }
};
