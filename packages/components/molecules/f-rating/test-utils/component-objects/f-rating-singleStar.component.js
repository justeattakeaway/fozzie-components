import Page from '@justeat/f-wdio-utils';

class RatingSingleStar extends Page {
    constructor () {
        super('molecule-folder', 'f-rating--rating-single-star');
    }

    get component () { return $('[data-test-id="rating-single-star-component"]'); }
}

export default new RatingSingleStar();
