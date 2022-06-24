const Page = require('@justeat/f-wdio-utils/src/base.page');

module.exports = class Form extends Page {
    constructor () {
        super('organism', 'v-form-component');
    }
};
