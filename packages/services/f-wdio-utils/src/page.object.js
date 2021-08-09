class Page {
    constructor (componentType, componentName) {
        this.title = 'Component URLS';
        this.componentType = componentType;
        this.componentName = componentName;
        this.path = '';
    }

    open (url) {
        browser.url(url);
        return this;
    }

    waitForComponent (component) {
        component.waitForExist();
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
