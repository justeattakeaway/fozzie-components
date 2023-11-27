import Page from '@justeat/f-wdio-utils';

class SelfExclusion extends Page {
    constructor () {
        super('page', 'self-exclusion-component');
    }
}

export default new SelfExclusion();
