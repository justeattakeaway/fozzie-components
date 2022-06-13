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

    async load (type = 'default') {
        const componentType = {
            error: this.errorComponent,
            loggedIn: this.loggedInComponent,
            default: this.component
        };

        await super.load(componentType[type]);
    }

    async waitForComponent () {
        await super.waitForComponent(this.component);
    }

    async waitForLoggedInComponent () {
        await super.waitForComponent(this.loggedInComponent);
    }

    async waitForActivationSuccessComponent () {
        return super.waitForComponent(await this.activationSuccessComponent);
    }

    async waitForErrorComponent () {
        await super.waitForComponent(this.errorComponent);
    }

    async isComponentDisplayed () {
        return (await this.component).isDisplayed();
    }

    async isLoggedInComponentDisplayed () {
        return (await this.loggedInComponent).isDisplayed();
    }

    async isActivationSuccessComponentDisplayed () {
        return (await this.activationSuccessComponent).isDisplayed();
    }

    async isErrorComponentDisplayed () {
        return (await this.errorComponent).isDisplayed();
    }

    async clickActivateTakeawayPayButton () {
        return (await this.activateTakeawayPayButton).click();
    }

    async clickUnauthenticatedLoginButton () {
        return (await this.unauthenticatedLoginButton).click();
    }

    async clickUnauthenticatedRegisterButton () {
        return (await this.unauthenticatedRegisterButton).click();
    }

    async clickAuthenticatedLoginButton () {
        return (await this.authenticatedLoginButton).click();
    }

    async clickAuthenticatedRegisterButton () {
        return (await this.authenticatedRegisterButton).click();
    }

    async clickStartOrderingButton () {
        return (await this.startOrderingButton).click();
    }
};
