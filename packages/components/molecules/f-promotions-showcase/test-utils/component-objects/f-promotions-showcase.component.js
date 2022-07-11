import Page from '@justeat/f-wdio-utils';

class PromotionsShowcase extends Page {
    constructor () {
        super('molecule', 'promotions-showcase-component');
    }
}

export default new PromotionsShowcase();
