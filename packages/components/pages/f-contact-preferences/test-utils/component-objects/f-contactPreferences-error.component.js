import Page from '@justeat/f-wdio-utils';
import { ERROR_PAGE } from './selectors';

class ContactPreferencesError extends Page {
    constructor () {
        super('page', 'contact-preferences-component');
    }

    get component () { return $(ERROR_PAGE); }

    async isErrorPageDisplayed () {
        return this.component.isDisplayed();
    }
}

export default new ContactPreferencesError();
