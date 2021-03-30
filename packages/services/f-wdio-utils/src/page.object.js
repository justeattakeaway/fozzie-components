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
}

module.exports = Page;

