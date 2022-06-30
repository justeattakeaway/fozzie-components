import Page from '@justeat/f-wdio-utils/src/page.object';

export default class ActionButton extends Page {
    constructor () {
        super('atom-folder', 'f-button--button-component');
    }

    // Overriding base implementation
    get component () { return $('[data-test-id="action-button-component"]'); }

    async isComponentClickable () {
        return this.component.isClickable();
    }
};
