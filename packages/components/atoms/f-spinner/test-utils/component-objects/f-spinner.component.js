const Page = require('@justeat/f-wdio-utils/src/base.page');

module.exports = class Spinner extends Page {
    constructor () {
        super('atom', 'v-spinner-component');
    }
};
