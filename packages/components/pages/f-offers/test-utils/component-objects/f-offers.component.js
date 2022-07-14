import Page from '@justeat/f-wdio-utils';
import { COMPONENT } from './f-offers-selectors';

class Offers extends Page {
    constructor () {
        super('page', 'v-offers-component');
    }

    get component () { return $(COMPONENT); }
}

export default new Offers();
