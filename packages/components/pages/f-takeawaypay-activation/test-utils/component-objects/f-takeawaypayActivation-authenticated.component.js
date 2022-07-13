import Page from '@justeat/f-wdio-utils';
import {
    LOGGEDIN_COMPONENT,
    ACTIVATION_SUCCESS_COMPONENT,
    ACTIVATE_TAKEAWAYPAY_BUTTON,
    AUTHENTICATED_LOGIN_BUTTON,
    AUTHENTICATED_REGISTER_BUTTON,
    START_ORDERING_BUTTON
} from './f-takeawaypayActivation-selectors';

class TakeawaypayActivationAuthenticated extends Page {
    constructor () {
        super('page', 'takeawaypay-activation-component');
    }

    get component () { return $(LOGGEDIN_COMPONENT); }

    get activationSuccessComponent () { return $(ACTIVATION_SUCCESS_COMPONENT); }

    get activateTakeawayPayButton () { return $(ACTIVATE_TAKEAWAYPAY_BUTTON); }

    get loginButton () { return $(AUTHENTICATED_LOGIN_BUTTON); }

    get registerButton () { return $(AUTHENTICATED_REGISTER_BUTTON); }

    get startOrderingButton () { return $(START_ORDERING_BUTTON); }


    async waitForActivationSuccessComponent () {
        await this.activationSuccessComponent.waitForDisplayed();
    }

    async isActivationSuccessComponentDisplayed () {
        return this.activationSuccessComponent.isDisplayed();
    }

    async clickActivateTakeawayPayButton () {
        await this.activateTakeawayPayButton.click();
    }

    async clickLoginButton () {
        await this.loginButton.click();
    }

    async clickRegisterButton () {
        await this.registerButton.click();
    }

    async clickStartOrderingButton () {
        await this.startOrderingButton.click();
    }
}

export default new TakeawaypayActivationAuthenticated();
