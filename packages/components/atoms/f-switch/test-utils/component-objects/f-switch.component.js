import Page from '@justeat/f-wdio-utils';

class Switch extends Page {
    constructor () {
        super('atom', 'switch-component');
    }
}

export default new Switch();
