/* global browser */

class Page {
    constructor (componentType, componentName) {
        this.componenType = componentType;
        this.componentName = componentName;
        this.path = '';
        this.component = '';
    }

    open (url) {
        browser.url(url);
        return this;
    }

    waitForComponent (component) {
        this.component = component;
        this.component.waitForExist();
    }

    withQuery (name, value) {
        this.path += encodeURIComponent(`&${name}=${value}`);
        return this;
    }
}

module.exports = Page;
