const Page = require('@justeat/f-wdio-utils/src/base.page');

module.exports = class PromotionsShowcase extends Page {
    constructor () {
        super('molecule', 'promotions-showcase-component');
    }
};
