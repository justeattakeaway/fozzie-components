const { buildUrl } = require('./storybook-extensions');

class Page {
    #defaultWaitTimeout = 500;
    constructor (componentType, componentName) {
        this.title = 'Component URLS';
        this.componentType = componentType;
        this.componentName = componentName;
        this.path = '';
    }

    load (component) {
        const pageUrl = buildUrl(this.componentType, this.componentName, this.path);
        this.open(pageUrl);
        this.waitForComponent(component);
    }

    open (url) {
        browser.url(url);
        return this;
    }

    waitForComponent (component, timeoutMs = this.#defaultWaitTimeout) {
        component.waitForExist({ timeout: timeoutMs });
    }

    withQuery (name, value) {
        this.path += `&${name}=${value}`;
        return this;
    }

    /**
    * @description
    * Select all the text in the field and then performs a backspace to clear the field.
    *
    * @param {String} fieldName The name of the field
    */
    clearBlurField (fieldName) {
        // Determines the OS
        const CONTROL = process.platform === 'darwin' ? 'Command' : '\uE009';
        const el = this.fields[fieldName].input;
        el.click();
        el.keys([CONTROL, 'a']);
        el.keys(['Backspace']);
    }

    /**
    * @description
    * Populates a form with customer input details.
    *
    * @param {String} fieldName the name of the field
    * @param {Object} customerInput the input added by the customer
    * @example
    * fieldName : 'firstName',
    * customerInput = {
    *   firstName: {
    *     input: 'greg'
    *   }
    * }
    */
    populateForm (fieldName, customerInput) {
        this.setFieldValue(fieldName, customerInput[fieldName].input);
    }

    /**
     * @description
     * Sets the value of a form field.
     *
     * @param {String} fieldName name
     * @param {String} value to set
     */
    setFieldValue (fieldName, value) {
        this.fields[fieldName].input.setValue(value);
    }

    // eslint-disable-next-line class-methods-use-this
    testTabOrder (tabOrderArray) {
        const expectedTabOrder = tabOrderArray.concat(tabOrderArray[0]);
        const tabOrderValue = [];
        expectedTabOrder.forEach(el => {
            browser.keys('\uE004');
            tabOrderValue.push({
                selector: el.getAttribute('data-test-id'),
                isFocused: el.isFocused()
            });
        });
        return tabOrderValue;
    }
}

module.exports = Page;
