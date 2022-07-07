import Page from '@justeat/f-wdio-utils';

class SearchBox extends Page {
    constructor () {
        super('molecule', 'searchbox-component');
    }
}

export default new SearchBox();
