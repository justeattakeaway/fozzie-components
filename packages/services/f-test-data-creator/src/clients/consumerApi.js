const axios = require('axios');

module.exports = class ConsumerServiceApi {
    constructor (configuration) {
        this.createUserUrl = configuration.services.smartGateway.createUserUrl;
    }

    async createConsumerAsync (userInfo, timeout = 5000) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout
        };

        const requestData = {
            registrationSource: 'Native',
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            password: userInfo.password,
            emailAddress: userInfo.emailAddress
        };

        return axios.post(this.createUserUrl, requestData, config)
        .catch(error => {
            throw new Error(error.message);
        });
    }
};
