/* eslint-disable class-methods-use-this */
const crypto = require('crypto');

module.exports = class TestDataGenerator {
    get firstName () { return 'John'; }

    get lastName () { return 'Testington'; }

    get emailAddress () {
        return this._emailAddress;
    }

    set emailAddress (val) {
        this._emailAddress = val;
    }

    get password () { return crypto.randomBytes(10).toString('base64'); }
};
