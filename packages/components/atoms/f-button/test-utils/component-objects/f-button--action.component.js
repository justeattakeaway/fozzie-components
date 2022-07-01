import BasePage from '@justeat/f-wdio-utils';

class ActionButton extends BasePage.Page {
    constructor () {
        super('atom-folder', 'f-button--button-component');
    }

    // Overriding base implementation
    get component () { return $('[data-test-id="action-button-component"]'); }

    async isComponentClickable () {
        return this.component.isClickable();
    }
};

export default new ActionButton();