import Page from '@justeat/f-wdio-utils';

class Link extends Page {
    constructor () {
        super('atom', 'v-link-component');
    }
}

export default new Link();
