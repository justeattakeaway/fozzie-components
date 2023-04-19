import Page from '@justeat/f-wdio-utils';

class SegmentedControl extends Page {
    constructor () {
        super('atom', 'segmented-control-variants');
    }

    get component () { return $('[data-test-id="segmented-control"]'); }
}

export default new SegmentedControl();
