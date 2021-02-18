const Page = require('@justeat/f-wdio-utils/src/page.object');
const Checkout = require('./f-checkout.component');
const checkout = new Checkout();

const {
    GUEST_CHECKOUT_LOGIN_BUTTON,
    GUEST_CHECKOUT_HEADER
} = require('./f-checkout-selectors');

class GuestCheckout extends Page {

    get header () { return $(GUEST_CHECKOUT_HEADER) }
    get loginButton () { $(GUEST_CHECKOUT_LOGIN_BUTTON) }

    open(){
        super.openComponent('organism', 'checkout-component&knob-Get%20Checkout%20Url=%2Fcheckout-delivery.json&knob-Available%20Fulfilment%20Url=%2Fcheckout-available-fulfilment.json&knob-Create%20Guest%20Url=%2Fcreate-guest.json&knob-Get%20Basket%20Url=%2Fget-basket-delivery.json&knob-Auth%20token=&knob-Login%20Url=%2Flogin&viewMode=story');
    }

    waitForComponent(){
        super.waitForComponent(checkout.component);
    }

    isLoginButtonDisplayed(){
        return this.loginButton.isDisplayed();
    }

    isHeaderDisplayed(){
        return this.header.isDisplayed();
    }

    clickLoginButton(){
        return this.loginButton.click();
    }
}

module.exports = GuestCheckout;