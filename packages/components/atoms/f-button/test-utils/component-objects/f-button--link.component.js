import Page from '@justeat/f-wdio-utils';

class LinkButton extends Page {
    constructor () {
        super('atom-folder', 'f-button--link-button-component');
    }

    // Overridding base implementation
    get component () { return $('[data-test-id="link-button-component"]'); }

    async isComponentClickable () {
        return this.component.isClickable();
    }
};

export default new LinkButton();