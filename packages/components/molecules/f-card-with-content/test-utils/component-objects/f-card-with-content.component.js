import Page from '@justeat/f-wdio-utils';

class CardWithContent extends Page {
    constructor () {
        super('molecule', 'card-with-content-component');
    }
}

export default new CardWithContent();
