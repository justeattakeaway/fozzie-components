import Page from '@justeat/f-wdio-utils';

class Spinner extends Page {
    constructor () {
        super('atom', 'v-spinner-component');
    }
}

export default new Spinner();
