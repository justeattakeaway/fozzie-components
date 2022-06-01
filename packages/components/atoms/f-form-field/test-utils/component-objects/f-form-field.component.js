const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class FormField extends Page {
    constructor () {
        super('atom-folder', 'f-form-field--text-input-default-component');
    }

    get component () { return $('[data-test-id="formfield-container"]'); }

    get label () { return $('[data-test-id="formfield-label"]'); }

    get input () { return $('[data-test-id="formfield-input"]'); }

    async isComponentDisplayed () {
        return this.component.isDisplayed();
    }

    async isLabelDisplayed () {
        return this.label.isDisplayed();
    }

    /**
    * @param {Object} userInput
    * @param {String} userInput.firstName The user's first name
    * @description
    * The below function adds and displays the user's first name into the form-field component.
    */
    async addUserInput (userInput) {
        await this.input.setValue(userInput.firstName);
    }

    async getUserInput () {
        return this.input.getValue();
    }
};
