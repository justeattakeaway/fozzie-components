const Page = require('@justeat/f-wdio-utils/src/base.page');

module.exports = class UserMessage extends Page {
    constructor () {
        super('molecule', 'user-message-component');
    }

    get content () { return this.component.$('[data-test-id="user-message-content"]'); }

    async isContentDisplayed () {
        const messageContent = this.content.getText();

        return this.content.isDisplayed() && messageContent.length > 0;
    }
};
