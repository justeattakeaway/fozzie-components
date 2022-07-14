import Page from '@justeat/f-wdio-utils';
import {
    ERROR_PAGE_COMPONENT
} from './f-checkout-selectors';

class CheckoutError extends Page {
    constructor () {
        super('page', 'checkout-component');
    }

    get component () { return $(ERROR_PAGE_COMPONENT); }
}

export default new CheckoutError();
