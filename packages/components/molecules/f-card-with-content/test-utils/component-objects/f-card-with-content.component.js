const Page = require('@justeat/f-wdio-utils/src/base.page');

module.exports = class CardWithContent extends Page {
    constructor () {
        super('molecule', 'card-with-content-component');
    }
};
