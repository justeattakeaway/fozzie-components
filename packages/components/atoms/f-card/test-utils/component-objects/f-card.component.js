const Page = require('@justeat/f-wdio-utils/src/base.page');

module.exports = class Card extends Page {
    constructor () {
        super('atom', 'card-component');
    }
};
