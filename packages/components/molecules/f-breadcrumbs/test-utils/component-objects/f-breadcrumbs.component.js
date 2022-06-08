const Page = require('@justeat/f-wdio-utils/src/base.page');

module.exports = class Breadcrumbs extends Page {
    constructor () {
        super('molecule', 'breadcrumbs-component');
    }
};
