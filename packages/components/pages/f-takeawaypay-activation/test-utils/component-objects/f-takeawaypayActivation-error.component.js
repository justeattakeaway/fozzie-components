import Page from '@justeat/f-wdio-utils';
import { ERROR_COMPONENT } from './f-takeawaypayActivation-selectors';

class TakeawaypayActivationError extends Page {
    constructor () {
        super('page', 'takeawaypay-activation-component');
    }

    get component () { return $(ERROR_COMPONENT); }
}

export default new TakeawaypayActivationError();
