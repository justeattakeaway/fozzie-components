import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
const Alert = require('../../../test-utils/component-objects/f-alert.component');
const alert = new Alert();

describe('Accessibility tests', () => {
    beforeEach(() => {
        alert.open();
        alert.waitForComponent();
    });

    it('a11y - should test f-alert component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-alert');
    });
});
