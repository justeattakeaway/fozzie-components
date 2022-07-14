import Page from '@justeat/f-wdio-utils';
import {
    TAKEAWAYPAYACTIVATION_COMPONENT,
    UNAUTHENTICATED_LOGIN_BUTTON,
    UNAUTHENTICATED_REGISTER_BUTTON
} from './f-takeawaypayActivation-selectors';

class TakeawaypayActivationUnauthenticated extends Page {
    constructor () {
        super('page', 'takeawaypay-activation-component');
    }

    get component () { return $(TAKEAWAYPAYACTIVATION_COMPONENT); }

    get loginButton () { return $(UNAUTHENTICATED_LOGIN_BUTTON); }

    get registerButton () { return $(UNAUTHENTICATED_REGISTER_BUTTON); }


    async clickUnauthenticatedLoginButton () {
        await this.loginButton.click();
    }

    async clickUnauthenticatedRegisterButton () {
        await this.registerButton.click();
    }
}

export default new TakeawaypayActivationUnauthenticated();
