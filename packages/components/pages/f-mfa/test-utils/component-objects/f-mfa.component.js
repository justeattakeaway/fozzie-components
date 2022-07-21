const Page = require('@justeat/f-wdio-utils/src/base.page');

module.exports = class Mfa extends Page {
    constructor () {
        super('page', 'v-mfa-component');
    }
};
