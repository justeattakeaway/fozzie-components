const Page = require('@justeat/f-wdio-utils/src/base.page');

module.exports = class SearchBox extends Page {
    constructor () {
        super('molecule', 'searchbox-component');
    }
};
