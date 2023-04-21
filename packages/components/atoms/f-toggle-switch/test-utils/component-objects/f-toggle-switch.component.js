import Page from '@justeat/f-wdio-utils';

class ToggleSwitch extends Page {
    constructor () {
        super('atom', 'toggle-switch-component');
    }
}

export default new ToggleSwitch();
