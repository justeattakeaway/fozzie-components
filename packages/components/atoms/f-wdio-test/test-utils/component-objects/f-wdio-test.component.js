import Page from '@justeat/f-wdio-utils';

class WdioTest extends Page {
    constructor () {
        super('atom', 'wdio-test-component');
    }
}

export default new WdioTest();
