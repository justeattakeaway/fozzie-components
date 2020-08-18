import assert from 'assert';

class FHeaderSpecs {
    constructor () {
        this.loginLink = $('[data-test-id="login-link"]');
        this.offersLink = $('[data-test-id="offers-link"]');
        this.deliveryEnquiryLink = $('[data-test-id="delivery-link"]');
        this.helpLink = $('[data-test-id="help-link"]');
        this.headerLogo = $('[data-test-id="header-logo"]');
    }

    clickLogin () {
        this.loginLink.click();
        return this;
    }

    clickOffersLink () {
        this.offersLink.click();
        return this;
    }

    clickDeliveryEnquiryLink () {
        this.deliveryEnquiryLink.click();
        return this;
    }

    clickHelpLink () {
        this.helpLink.click();
        return this;
    }

    logoIsDisplayed () {
        assert.ok(this.headerLogo.isDisplayed());
        return this;
    }
}

export default FHeaderSpecs;
