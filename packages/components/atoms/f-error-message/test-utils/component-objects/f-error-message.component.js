const Page = require('@justeat/f-wdio-utils/src/base.page');

module.exports = class ErrorMessage extends Page {
    constructor () {
        super('atom', 'error-message-component');
    }
};
