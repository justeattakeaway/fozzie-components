import assert from 'assert';

class FHeaderSpecs {
    constructor () {
        this.headerLogo = $('[data-test-id="header-logo"]');
    }

    logoIsDisplayed () {
        this.headerLogo.isDisplayed();
        return this;
    }
}

export default FHeaderSpecs;
