const crypto = require('crypto');

module.exports = class TestDataGenerator {
    get firstName () { return 'John'; }

    get lastName () { return 'Testington'; }

    set emailAddress (val) {
        this._emailAddress = val;
    }

    get emailAddress () {
        return this._emailAddress;
    }

    // get emailAddress () { return `${this.firstName}-${crypto.randomBytes(10).toString()}@justeattakeaway.com`; }

    get password () { return crypto.randomBytes(10).toString('base64'); }


    // async createUserData () {

    //     const userInfo = {
    //         firstName: this.firstName,
    //         lastName: this.lastName,
    //         emailAddress: this.emailAddress,
    //         password: this.password
    //     }

    //     const { data } = await this.consumerApiService.createConsumer(this.smartGatewayBaseUrl, userInfo);
    //     console.log('heyyyy', data.token);
    //     return data.token;
    // }
};

// how to pass tenant to end points
// get services to pick up url from configs
// do we need to pick up different functions depending on int or uk
// modify current functions - so that we pass in the email address - import the testdatagenerator into checkout and add:
// const emailAddress = testGenerator.emailAddress
// fix cors issue - test int works in checkout
// create an AuthorizationService with function 'authoriseAsync' - authoriseIntAsync, authoriseUk
// pass in email address through parameter and password in 'testgenerator.password' into authorizeApi service class
// the response will be the access token --
// see what the urls are for uk and int

// sort out config
// start on basketid




