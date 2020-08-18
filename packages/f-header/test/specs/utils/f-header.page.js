import assert from 'assert';

class FHeaderSpecs {
    constructor () {
        this.headerLogo = $('[data-test-id="header-logo"]');
        console.log(this.headerLogo);
    }

    logoIsDisplayed () {
        assert.ok(this.headerLogo.isDisplayed());
        return this;
    }
}

export default FHeaderSpecs;
