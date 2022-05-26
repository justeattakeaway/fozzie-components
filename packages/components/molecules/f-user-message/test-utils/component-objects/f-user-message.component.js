const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class UserMessage extends Page {
    constructor () {
        super('molecule', 'user-message-component');
    }

    get component () { return $('[data-test-id="user-message-component"]'); }
    get content () { return this.component.$('[data-test-id="user-message-content"]'); }

    async load () {
        await super.load(this.component);
    }

    async waitForComponent () {
        await super.waitForComponent(this.component);
    }

    async isComponentDisplayed () {
        return this.component.isDisplayed();
    }

    async isContentDisplayed () {
        const messageContent = this.content.getText();

        return this.content.isDisplayed() && messageContent.length > 0;
    }
};
