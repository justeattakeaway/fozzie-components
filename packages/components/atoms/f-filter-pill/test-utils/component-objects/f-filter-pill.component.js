const Page = require('@justeat/f-wdio-utils/src/base.page');

module.exports = class FilterPill extends Page {
    constructor () {
        super('atom', 'filter-pill-component');
    }
};
