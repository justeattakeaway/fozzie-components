import Page from '@justeat/f-wdio-utils';

class UserMessage extends Page {
    constructor () {
        super('molecule', 'user-message-component');
    }

    get content () { return this.component.$('[data-test-id="user-message-content"]'); }

    async isContentDisplayed () {
        const messageContent = await this.content.getText();
        return this.content.isDisplayed() && messageContent.length > 0;
    }
}

export default new UserMessage();
