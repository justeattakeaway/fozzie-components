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
