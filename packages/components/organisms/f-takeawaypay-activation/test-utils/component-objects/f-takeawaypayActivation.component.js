const Page = require('@justeat/f-wdio-utils/src/page.object');
const {
    TAKEAWAYPAYACTIVATION_COMPONENT,
    LOGGEDIN_COMPONENT,
    ERROR_COMPONENT,
    ACTIVATION_SUCCESS_COMPONENT,
    ACTIVATE_TAKEAWAYPAY_BUTTON
} = require('./f-takeawaypayActivation-selectors');

module.exports = class TakeawaypayActivation extends Page {
    constructor() {
        super('organism', 'takeawaypay-activation-component');
    }

    get component() { return $(TAKEAWAYPAYACTIVATION_COMPONENT); }

    get loggedInComponent() { return $(LOGGEDIN_COMPONENT); }

    get errorComponent() { return $(ERROR_COMPONENT); }

    get activationSuccessComponent() { return $(ACTIVATION_SUCCESS_COMPONENT); }

    get activateTakeawayPayButton() { return $(ACTIVATE_TAKEAWAYPAY_BUTTON); }

    load(type = 'default') {
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

    withQuery(name, value) {
        super.withQuery(name, value);
        return this;
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    waitForActivationSuccessComponent() {
        super.waitForComponent(this.activationSuccessComponent);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }

    clickActivateTakeawayPayButton() {
        return this.activateTakeawayPayButton.click();
    }
}
