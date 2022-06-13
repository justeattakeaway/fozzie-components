const Page = require('@justeat/f-wdio-utils/src/base.page');

module.exports = class Popover extends Page {
    constructor () {
        super('atom', 'popover-component');
    }
};
