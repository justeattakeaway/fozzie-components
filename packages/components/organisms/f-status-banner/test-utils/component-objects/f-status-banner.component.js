import Page from '@justeat/f-wdio-utils';

import {
    ADDRESS_BOX,
    BUTTON,
    ERROR_MESSAGE
} from './f-status-banner.selectors';


class StatusBanner extends Page {
    constructor () {
        super('organism', 'status-banner-component');
    }

    get addressBox () { return $(ADDRESS_BOX); }

    get button () { return $(BUTTON); }

    get errorMessage () { return $(ERROR_MESSAGE); }

    /**
    * @param {Object} userInput
    * @param {String} userInput.address The user's address
    * @description
    * The below function adds and displays the user's first name into the form-field component.
    */
    async addAddress (userInput) {
        await this.addressBox.setValue(userInput.address);
    }

    async clickSearchButton () {
        await this.button.click();
    }

    async getAddress () {
        return this.addressBox.getValue();
    }

    async getErrorMessage () {
        return this.errorMessage.getText();
    }
}

export default new StatusBanner();
