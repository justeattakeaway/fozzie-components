const Page = require('@justeat/f-wdio-utils/src/page.object');
const {
    TAKEAWAYPAYACTIVATION_COMPONENT,
    LOGGEDIN_COMPONENT,
    ERROR_COMPONENT,
    ACTIVATION_SUCCESS_COMPONENT,
    ACTIVATE_TAKEAWAYPAY_BUTTON,
    UNAUTHENTICATED_LOGIN_BUTTON,
    UNAUTHENTICATED_REGISTER_BUTTON,
    AUTHENTICATED_LOGIN_BUTTON,
    AUTHENTICATED_REGISTER_BUTTON,
    START_ORDERING_BUTTON
} = require('./f-takeawaypayActivation-selectors');

module.exports = class TakeawaypayActivation extends Page {
    constructor () {
        super('page', 'takeawaypay-activation-component');
    }

    get component () { return $(TAKEAWAYPAYACTIVATION_COMPONENT); }

    get loggedInComponent () { return $(LOGGEDIN_COMPONENT); }

    get errorComponent () { return $(ERROR_COMPONENT); }

    get activationSuccessComponent () { return $(ACTIVATION_SUCCESS_COMPONENT); }

    get activateTakeawayPayButton () { return $(ACTIVATE_TAKEAWAYPAY_BUTTON); }

    get unauthenticatedLoginButton () { return $(UNAUTHENTICATED_LOGIN_BUTTON); }

    get unauthenticatedRegisterButton () { return $(UNAUTHENTICATED_REGISTER_BUTTON); }

    get authenticatedLoginButton () { return $(AUTHENTICATED_LOGIN_BUTTON); }

    get authenticatedRegisterButton () { return $(AUTHENTICATED_REGISTER_BUTTON); }

    get startOrderingButton () { return $(START_ORDERING_BUTTON); }

    load (type = 'default') {
        switch (type) {
            case 'error':
                super.load(this.errorComponent);
                break;
            case 'loggedIn':
                super.load(this.loggedInComponent);
                break;
            case 'default':
            default:
                super.load(this.component);
                break;
        }
    }

    withQuery (name, value) {
        super.withQuery(name, value);
        return this;
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    waitForLoggedInComponent () {
        super.waitForComponent(this.loggedInComponent);
    }

    waitForActivationSuccessComponent () {
        super.waitForComponent(this.activationSuccessComponent);
    }

    waitForErrorComponent () {
        super.waitForComponent(this.errorComponent);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }

    isLoggedInComponentDisplayed () {
        return this.loggedInComponent.isDisplayed();
    }

    isActivationSuccessComponentDisplayed () {
        return this.activationSuccessComponent.isDisplayed();
    }

    isErrorComponentDisplayed () {
        return this.errorComponent.isDisplayed();
    }

    clickActivateTakeawayPayButton () {
        return this.activateTakeawayPayButton.click();
    }

    clickUnauthenticatedLoginButton () {
        return this.unauthenticatedLoginButton.click();
    }

    clickUnauthenticatedRegisterButton () {
        return this.unauthenticatedRegisterButton.click();
    }

    clickAuthenticatedLoginButton () {
        return this.authenticatedLoginButton.click();
    }

    clickAuthenticatedRegisterButton () {
        return this.authenticatedRegisterButton.click();
    }

    clickStartOrderingButton () {
        return this.startOrderingButton.click();
    }
};
