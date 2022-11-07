import Page from '@justeat/f-wdio-utils';

class Rating extends Page {
    constructor () {
        super('molecule-folder', 'f-rating--rating-component');
    }

    get component () { return $('[data-test-id="rating-multi-star-component"]'); }
}

export default new Rating();
