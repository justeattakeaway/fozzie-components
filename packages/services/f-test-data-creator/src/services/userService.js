const ConsumerApiService = require('../clients/consumerApi');
const PublicApiService = require('../clients/publicApi');
const TestDataGenerator = require('../test-data-generator');

module.exports = class UserService {
    constructor (configuration, tenant, emailAddress) {
        this.environment = configuration.Environment;
        this.tenant = tenant;
        this.emailAddress = emailAddress;
        this.consumerApiService = new ConsumerApiService(configuration);
        this.publicApiService = new PublicApiService(configuration);
        this.testDataGenerator = new TestDataGenerator(this.emailAddress);
        this.password = this.testDataGenerator.password;
    }

    async createUserAsync () {
        console.log(`Attempting to create user in ${this.environment} for tenant: ${this.tenant} with email address: ${this.emailAddress}`);
        let result;
        if (this.tenant === 'uk') {
            result = this.createUserForUKAsync();
        } else {
            result = this.createUserForInternationalAsync(this.tenant);
        }

        return result;
    }

    async createUserForUKAsync () {
        const userInfo = {
            firstName: this.testDataGenerator.firstName,
            lastName: this.testDataGenerator.lastName,
            emailAddress: this.emailAddress,
            password: this.password
        };

        const { data } = await this.consumerApiService.createConsumer(userInfo);

        console.log(`Successfully created user with email address: ${userInfo.emailAddress} and password: ${userInfo.password}`);

        return data.token;
    }

    async createUserForInternationalAsync () {
        const userInfo = {
            firstName: this.testDataGenerator.firstName,
            lastName: this.testDataGenerator.lastName,
            emailAddress: this.emailAddress,
            password: this.password,
            tenant: this.tenant
        };

        const { data } = await this.publicApiService.createConsumer(userInfo);

        console.log(`Successfully created user with email address: ${userInfo.emailAddress} and password: ${userInfo.password}`);

        return data.token;
    }
};
