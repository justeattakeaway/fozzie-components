const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class FormField extends Page {
    get component () { return $('[data-test-id="formfield-container"]'); }

    get label () { return $('[data-test-id="formfield-label"]'); }

    get input () { return $('[data-test-id="formfield-input"]'); }

    open () {
        super.openComponent('atom', 'form-field-component');
    }

    waitForComponent () {
        this.component.waitForExist();
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }

    isLabelDisplayed () {
        return this.label.isDisplayed();
    }

    /**
    * @param {Object} userInput
    * @param {String} userInput.firstName The user's first name
    * @description
    * The below function adds and displays the user's first name into the form-field component.
    */
    addUserInput (userInput) {
        this.input.setValue(userInput);
    }

    isUserInputDisplayed () {
        const value = this.input.getValue();
        value.isDisplayed();
    }
};
