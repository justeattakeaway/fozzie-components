import Page from '@justeat/f-wdio-utils';

import {
    MFA_SUBMIT_BUTTON,
    MFA_TEXT_BOX,
    MFA_HELP_LINK,
    HELP_FAQ_LINK,
    HELP_CLOSE_BUTTON,
    HELP_LOGIN_LINK,
    ERROR_BACK_BUTTON,
    SUBIT_ERROR_ALERT,
    MFA_VERIFICATION_COMPONENT,
    MFA_ERROR_COMPONENT,
    MFA_HELP_COMPONENT,
    FIELD
} from './f-mfa-selectors';

class Mfa extends Page {
    constructor () {
        super('page', 'v-mfa-component');
    }

    get mfaSubmitButton () { return $(MFA_SUBMIT_BUTTON); }

    get mfaTextBox () { return $(MFA_TEXT_BOX); }

    get mfaHelpLink () { return $(MFA_HELP_LINK); }

    get helpFaqLink () { return $(HELP_FAQ_LINK); }

    get helpCloseButton () { return $(HELP_CLOSE_BUTTON); }

    get helpLoginLink () { return $(HELP_LOGIN_LINK); }

    get errorBackButton () { return $(ERROR_BACK_BUTTON); }

    get submitErrorAlert () { return $(SUBIT_ERROR_ALERT); }

    get mfaScreen () { return $(MFA_VERIFICATION_COMPONENT); }

    get errorScreen () { return $(MFA_ERROR_COMPONENT); }

    get helpScreen () { return $(MFA_HELP_COMPONENT); }

    fields = {
        mfaCodeInput: {
            get input () { return $(FIELD.mfaCodeInput.input); }
        }
    };

    async waitForMfaScreenDisplayed (timeoutMs = 1000) {
        // eslint-disable-next-line no-return-await
        return await this.mfaScreen.waitForComponent(timeoutMs);
    }

    async waitForErrorScreenDisplayed (timeoutMs = 1000) {
        // eslint-disable-next-line no-return-await
        return await this.errorScreen.waitForComponent(timeoutMs);
    }

    async waitForHelpScreenDisplayed (timeoutMs = 1000) {
        // eslint-disable-next-line no-return-await
        return await this.helpScreen.waitForComponent(timeoutMs);
    }

    async goToHelp () {
        await this.mfaHelpLink.click();
    }

    async goToSubmit () {
        await this.mfaSubmitButton.click();
    }
}

export default new Mfa();
