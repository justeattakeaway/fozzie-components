import Page from '@justeat/f-wdio-utils';

class Mfa extends Page {
    constructor () {
        super('page', 'v-mfa-component');
    }

    get mfaSubmitButton () { return $('[data-test-id="mfa-submit-button"]'); }

    get mfaTextBox () { return $('[data-test-id="mfa-verification-code-textbox"]'); }

    get mfaHelpLink () { return $('[data-test-id="mfa-need-help-link"]'); }

    get helpFaqLink () { return $('[data-test-id="f-mfa-help-faq-link"]'); }

    get helpCloseButton () { return $('[data-test-id="mfa-help-enter-code-button"]'); }

    get helpLoginLink () { return $('[data-test-id="mfa-help-login-link"]'); }

    get errorBackButton () { return $('[data-test-id="cardWithContent-primaryButton"]'); }

    get mfaScreen () { return $('[data-test-id="v-mfa-verification-component"]'); }

    get errorScreen () { return $('[data-test-id="v-mfa-error-component"]'); }

    get helpScreen () { return $('[data-test-id="v-mfa-help-component"]'); }

    async isMfaScreenDisplayed () {
        // eslint-disable-next-line no-return-await
        return await this.mfaScreen.isDisplayed();
    }

    async isErrorScreenDisplayed () {
        // eslint-disable-next-line no-return-await
        return await this.errorScreen.isDisplayed();
    }

    async isHelpScreenDisplayed () {
        // eslint-disable-next-line no-return-await
        return await this.helpScreen.isDisplayed();
    }
}

export default new Mfa();
