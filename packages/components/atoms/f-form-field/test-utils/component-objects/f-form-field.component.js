const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class FormField extends Page {
    constructor() {
        super('atom-folder', 'f-form-field--text-input-default-component');
    }

    get component () { return $('[data-test-id="formfield-container"]'); }

    get label () { return $('[data-test-id="formfield-label"]'); }

    get input () { return $('[data-test-id="formfield-input"]'); }

    load () {
        super.load(this.component);
    }

    waitForComponent () {
        super.waitForComponent(this.component);
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
        this.input.setValue(userInput.firstName);
    }

    getUserInput () {
        return this.input.getValue();
    }
};
