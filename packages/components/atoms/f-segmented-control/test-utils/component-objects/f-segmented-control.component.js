import Page from '@justeat/f-wdio-utils';

class SegmentedControl extends Page {
    constructor () {
        super('atom', 'segmented-control-component');
    }
}

export default new SegmentedControl();
