const Page = require('@justeat/f-wdio-utils/src/page.object');
const {
    USER_MESSAGE_COMPONENT,
    USER_MESSAGE_CONTENT
} = require('./f-user-message-selectors');

module.exports = class UserMessage extends Page {

    get component () { return $(USER_MESSAGE_COMPONENT) }
    get content () { return this.component.$(USER_MESSAGE_CONTENT) }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    open (url) {
        super.open(url);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }

    isContentDisplayed () {
        const messageContent = this.content.getText();

        return this.content.isDisplayed() && messageContent.length > 0;
    }
}
