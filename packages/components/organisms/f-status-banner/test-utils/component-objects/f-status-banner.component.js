const Page = require('@justeat/f-wdio-utils/src/page.object');

const {
    COMPONENT,
    ADDRESS_BOX,
    BUTTON,
    ERROR_MESSAGE
} = require('./f-status-banner.selectors');


module.exports = class StatusBanner extends Page {
    constructor () {
        super('organism', 'status-banner-component');
    }

    get component () { return $(COMPONENT); }

    get addressBox () { return $(ADDRESS_BOX); }

    get button () { return $(BUTTON); }

    get errorMessage () { return $(ERROR_MESSAGE); }

    load () {
        super.load(this.component);
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isStatusBannerComponentDisplayed () {
        return this.component.isDisplayed();
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
};
