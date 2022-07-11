import Page from '@justeat/f-wdio-utils';

class Breadcrumbs extends Page {
    constructor () {
        super('molecule', 'breadcrumbs-component');
    }
}

export default new Breadcrumbs();
