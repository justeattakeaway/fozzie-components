import { source } from 'axe-core';
import { buildUrl } from './storybook-extensions';

export default class Page {
    constructor (componentType, componentName, componentTag = 'data-test-id') {
        this.title = 'Component URLS';
        this.componentType = componentType;
        this.componentName = componentName;
        this.componentTag = componentTag;
        this.path = '';
    }

    get component () {
        return $(`[${this.componentTag}='${this.componentName}']`);
    }

    async waitForComponent () {
        return await this.component.waitForDisplayed();
    }

    async isComponentDisplayed () {
        return await this.component.isDisplayed();
    }

    load (queries) {
        const pageUrl = buildUrl(this.componentType, this.componentName, this.composePath(queries));
        this.open(pageUrl);
        this.waitForComponent();
    }

    async load () {
        const pageUrl = buildUrl(this.componentType, this.componentName, this.path);
        await this.open(pageUrl);
        await this.waitForComponent();
    }

    open (url) {
        browser.url(url);
        return this;
    }

    async open (url) {
        await browser.url(url);
        return this;
    }

    composePath (queries) {
        if (!queries) { return ''; }

        return `&args=${Object.keys(queries)
        .map(name => `${name}:${queries[name]}`)
        .join(';')}`;
    }

    waitForComponent (timeoutMs = 1000) {
        this.component.waitForDisplayed({ timeout: timeoutMs });
    }

    async waitForComponent (timeoutMs = 1000) {
        await this.component.waitForDisplayed({ timeout: timeoutMs });
    }

    withQuery (name, value) {
        this.path += `&${name}=${value}`;
        return this;
    }

    /**
    * @description
    * Selects all the text in the field and then performs a backspace to clear the field.
    *
    * @param {String} fieldName The name of the field
    */
    clearBlurField (fieldName) {
        // Determines the OS
        const CONTROL = process.platform === 'darwin' ? 'Command' : '\uE009';
        const el = this.fields[fieldName].input;
        el.waitForClickable();
        el.click();
        el.keys([CONTROL, 'a']);
        el.waitUntil(() => {
            return this.isSelected()
        });
        el.keys(['Backspace']);
        el.waitUntil(() => {
            return this.getText().length === 0
        });
    }

    /**
    * @description
    * Selects all the text in the field and then performs a backspace to clear the field.
    *
    * @param {String} fieldName The name of the field
    */
    async clearBlurField (fieldName) {
        // Determines the OS
        const CONTROL = process.platform === 'darwin' ? 'Command' : '\uE009';
        const el = this.fields[fieldName].input;
        (await el).waitForClickable();
        (await el).click();
        (await el).keys([CONTROL, 'a']);
        (await el).waitUntil(async function () {
            return (await this.isSelected())
        });
        (await el).keys(['Backspace']);
        (await el).waitUntil(async function () {
            return (await this.getText()).length === 0
        });
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
     * @param {String} fieldName the name of the field
     * @param {String} value the value set
     */
    setFieldValue (fieldName, value) {
        this.fields[fieldName].input.setValue(value);
        this.fields[fieldName].input.waitUntil(function () {
            return this.getText() === value
        });
    }

    /**
     * @description
     * Sets the value of a form field.
     *
     * @param {String} fieldName the name of the field
     * @param {String} value the value set
     */
     async setFieldValue (fieldName, value) {
        (await this.fields[fieldName].input).setValue(value);
        (await this.fields[fieldName].input).waitUntil(async function () {
            return (await this.getText() === value)
        });
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

    /**
     * Runs accessibility test results against a set of rules defined.
     *
     * @returns {ThenArg<ReturnType<BrowserCommandsType["executeAsync"]>>}
     */
    getAccessibilityTestResults = () => {
        browser.execute(source);

        // https://github.com/dequelabs/axe-core/blob/develop/doc/API.md

        return browser.executeAsync(done => {
            const options = {
                runOnly: {
                    type: 'tag',
                    values: ['wcag21a', 'wcag21aa', 'wcag143', 'cat.color', 'cat.aria']
                },
                rules: {
                    'duplicate-id': { enabled: false },
                    // Ignoring as lang attribute is provided via a mixin, however Axe still fails.
                    'html-has-lang': { enabled: false },
                    'aria-allowed-role': { enabled: false }
                }
            };

            axe.run(document, options, (err, results) => {
                if (err) throw err;
                done(results);
            });
        });
    };
}