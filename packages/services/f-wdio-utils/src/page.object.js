const { buildUrl } = require('./storybook-extensions');

class Page {
    constructor (componentType, componentName) {
        this.title = 'Component URLS';
        this.componentType = componentType;
        this.componentName = componentName;
        this.path = '';
    }

    load (component, queries) {
        const pageUrl = buildUrl(this.componentType, this.componentName, this.composePath(queries));
        this.open(pageUrl);
        this.waitForComponent(component);
    }

    open (url) {
        browser.url(url);
        return this;
    }

    waitForComponent (component) {
        component.waitForExist();
    }

    composePath (queries) {
        if (!queries) { return ""; }

        return "&" + Object.keys(queries)
        .map(name => `knob-${name}=${queries[name]}`)
        .join("&");
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
