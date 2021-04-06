const Page = require('@justeat/f-wdio-utils/src/page.object');

const {
    COMPONENT,
    ADDRESS_BOX,
    BUTTON
} = require('./f-statusBanner.selectors');


module.exports = class StatusBanner extends Page {
    get component () { return $(COMPONENT); }

    get addressBox () { return $(ADDRESS_BOX); }

    get button () { return $(BUTTON); }

    open () {
        super.openComponent('organism', 'status-banner-component');
    }

    waitForComponent () {
        this.component.waitForExist();
    }

    isStatusBannerComponentDisplayed () {
        return this.component.isDisplayed();
    }

    isAddressBoxDisplayed () {
        return this.addressBox.isDisplayed();
    }

    isSearchButtonDisplayed () {
        return this.button.isDisplayed();
    }

    /**
    * @param {Object} userInput
    * @param {String} userInput.address The user's address
    * @description
    * The below function adds and displays the user's first name into the form-field component.
    */
    addAddress (userInput) {
        this.addressBox.setValue(userInput.address);
    }

    getAddress () {
        return this.addressBox.getValue();
    }
};
