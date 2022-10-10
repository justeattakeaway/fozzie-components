import Page from '@justeat/f-wdio-utils';

class Rating extends Page {
    constructor () {
        super('molecule', 'rating-component');
    }
}

export default new Rating();
