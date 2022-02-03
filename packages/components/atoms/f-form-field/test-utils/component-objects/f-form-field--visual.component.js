const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class FormField extends Page {
    constructor () {
        super('atom-folder', 'f-form-field--form-field-component');
    }

    get component () { return $('[data-test-id="formfield-container"]'); }

    load () {
        super.load(this.component);
    }
};
