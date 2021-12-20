const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class UserMessage extends Page {
    constructor () {
        super('molecule', 'user-message-component');
    }

    get component () { return $('[data-test-id="user-message-component"]'); }
    get content () { return this.component.$('[data-test-id="user-message-content"]'); }

    load () {
        super.load(this.component);
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }

    isContentDisplayed () {
        const messageContent = this.content.getText();

        return this.content.isDisplayed() && messageContent.length > 0;
    }
};
