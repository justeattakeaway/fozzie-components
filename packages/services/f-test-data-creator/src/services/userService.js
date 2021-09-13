const ConsumerApiService = require('../clients/consumerApi');
const PublicApiService = require('../clients/publicApi');
const TestDataGenerator = require('../test-data-generator');

module.exports = class UserService {
    constructor (configuration, tenant, emailAddress) {
        this.environment = configuration.environment;
        this.tenant = tenant;
        this.emailAddress = emailAddress;
        this.consumerApiService = new ConsumerApiService(configuration);
        this.publicApiService = new PublicApiService(configuration);
        this.testDataGenerator = new TestDataGenerator(this.emailAddress);
        this.password = this.testDataGenerator.password
    }

    async createUserAsync() {
        console.log(`Creating user in ${this.environment} for tenant: ${this.tenant} with email address: ${this.emailAddress}`)
        if (this.tenant === 'uk') {
           return this.createUserForUKAsync();
            
        } else {
            return this.createUserForInternationalAsync(this.tenant);
        }
        // console.log('Successfully created user!')
    }
    
    async createUserForUKAsync(){
        const userInfo = {
            firstName: this.testDataGenerator.firstName,
            lastName: this.testDataGenerator.lastName,
            emailAddress: this.emailAddress,
            password: this.password
        }

        console.log('create user -', userInfo);

        const { data } = await this.consumerApiService.createConsumer(userInfo);  
        console.log('uk', data.token);
        return data.token;
    }
    
    async createUserForInternationalAsync(){
        const userInfo = {
            firstName: this.testDataGenerator.firstName,
            lastName: this.testDataGenerator.lastName,
            emailAddress: this.emailAddress,
            password: this.password,
            tenant: this.tenant
        }

        console.log(userInfo);

        const { data } = await this.publicApiService.createConsumer(userInfo);    
        console.log('int', data);
        return data.token;
    }
}