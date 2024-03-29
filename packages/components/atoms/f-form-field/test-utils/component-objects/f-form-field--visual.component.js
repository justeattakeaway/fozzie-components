import Page from '@justeat/f-wdio-utils';

class FormField extends Page {
    constructor () {
        super('atom-folder', 'f-form-field--form-field-component');
    }

    get component () { return $('[data-test-id="formfield-container"]'); }
}

export default new FormField();
