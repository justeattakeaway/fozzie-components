const Page = require('@justeat/f-wdio-utils/src/page.object');
const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');

module.exports = class Buttons extends Page {
    constructor () {
        super('atom-folder', 'f-button--button-component');
    }

    load (type='action') {
        const pageUrl = buildUrl(this.componentType, this.componentName, this.path);
        this.open(pageUrl);

        if ('action' === type) {
            this.waitForActionComponent();
        } else {
            this.waitForLinkComponent();
        }
    }

    get actionComponent () { return $('[data-test-id="action-button-component"]'); }

    get linkComponent () { return $('[data-test-id="link-button-component"]'); }

    open (url) {
        super.open(url);
    }
    /**
     * @description
     * Sets the data for the button component.
     * 
     * @param {Object} button
     * @param {String} button.type
     * @param {String} button.size
     */
    // open (button) {
    //     const type = `&knob-Button%20Type=${button.type}`;
    //     const url = button.type === 'link' ? `&knob-href=link` : '';
    //     const size = `&knob-Button%20Size=${button.size}`;

    //     browser.url(`/iframe.html?id=components-atoms-f-button--button-component${type}${url}${size}`)
    // }

    waitForActionComponent () {
        super.waitForComponent(this.actionComponent);
    }

    waitForLinkComponent () {
        super.waitForComponent(this.linkComponent);
    }

    isActionComponentDisplayed () {
        return this.actionComponent.isDisplayed();
    }

    isLinkComponentDisplayed () {
        return this.linkComponent.isDisplayed();
    }
};
