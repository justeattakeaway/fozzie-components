import Page from '@justeat/f-wdio-utils';

class Toggle extends Page {
    constructor () {
        super('atom', 'toggle-component');
    }
}

export default new Toggle();
