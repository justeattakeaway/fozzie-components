import Page from '@justeat/f-wdio-utils';

class Form extends Page {
    constructor () {
        super('organism', 'v-form-component');
    }
}

export default new Form();
