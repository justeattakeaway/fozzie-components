const Page = require('@justeat/f-wdio-utils/src/base.page');

module.exports = class Loyalty extends Page {
    constructor () {
        super('page', 'v-loyalty-component');
    }
};
