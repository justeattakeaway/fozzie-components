class Page {
    constructor() {
        this.title = 'Component URLs'
    }

    openOrganism(path) {
        browser.url(`/iframe.html?id=components-organisms--${path}`)
    }

    openAtom(path) {
        browser.url(`/iframe.html?id=components-atoms--${path}`)
    }

    openMolecules(path) {
        browser.url(`/iframe.html?id=components-molecules--${path}`)
    }

    waitForComponent(component){
        component.waitForExist();
    }
}

module.exports = Page;

