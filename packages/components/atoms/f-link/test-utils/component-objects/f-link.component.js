const Page = require('@justeat/f-wdio-utils/src/base.page');

module.exports = class Link extends Page {
    constructor () {
        super('atom', 'v-link-component');
    }
};
