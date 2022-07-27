import Page from '@justeat/f-wdio-utils';

class Mfa extends Page {
    constructor () {
        super('page', 'v-mfa-component');
    }
}

export default new Mfa();
