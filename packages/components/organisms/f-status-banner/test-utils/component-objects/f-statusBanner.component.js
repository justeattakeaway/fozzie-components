const Page = require('@justeat/f-wdio-utils/src/page.object');

const {
    COMPONENT,
    ADDRESS_BOX,
    BUTTON,
    ERROR_MESSAGE,
    BANNER_IMAGE,
    BANNER_HEADING,
    BANNER_SUBHEADING
} = require('./f-statusBanner.selectors');


module.exports = class StatusBanner extends Page {
    get component () { return $(COMPONENT); }

    get image () { return $(BANNER_IMAGE); }

    get heading () { return $(BANNER_HEADING); }

    get subheading () { return $(BANNER_SUBHEADING); }

    get addressBox () { return $(ADDRESS_BOX); }

    get button () { return $(BUTTON); }

    get errorMessage () { return $(ERROR_MESSAGE); }

    open () {
        super.openComponent('organism', 'status-banner-component');
    }

    waitForComponent () {
        this.component.waitForExist();
    }

    isStatusBannerComponentDisplayed () {
        return this.component.isDisplayed();
    }

    isImageDisplayed () {
        return this.image.isDisplayedInViewport();
    }

    isHeadingDisplayed () {
        return this.heading.isDisplayedInViewport();
    }

    isSubheadingDisplayed () {
        return this.subheading.isDisplayedInViewport();
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

    clickSearchButton () {
        this.button.click();
    }

    getAddress () {
        return this.addressBox.getValue();
    }

    getErrorMessage () {
        return this.errorMessage.getText();
    }

    isErrorMessageDisplayed () {
        return this.errorMessage.isDisplayed();
    }
};
