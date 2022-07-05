import Page from '@justeat/f-wdio-utils';

class Card extends Page {
    constructor () {
        super('atom', 'card-component');
    }
}

export default new Card();
