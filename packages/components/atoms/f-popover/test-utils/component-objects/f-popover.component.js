import Page from '@justeat/f-wdio-utils';

class Popover extends Page {
    constructor () {
        super('atom', 'popover-component');
    }
};

export default new Popover();
