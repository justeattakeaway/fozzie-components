import Page from '@justeat/f-wdio-utils';
import { COMPONENT } from './f-loyalty-selectors';

class Loyalty extends Page {
    constructor () {
        super('page', 'v-loyalty-component');
    }

    get component () { return $(COMPONENT); }
}

export default new Loyalty();
