import Page from '@justeat/f-wdio-utils';

class NavigationLinks extends Page {
    constructor () {
        super('molecule', 'navigation-links-component');
    }
}

export default new NavigationLinks();
