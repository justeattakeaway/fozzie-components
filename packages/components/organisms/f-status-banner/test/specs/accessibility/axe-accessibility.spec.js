const StatusBanner = require('../../../test-utils/component-objects/f-statusBanner.component');
const statusBanner = new StatusBanner();
import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';

describe('Accessibility tests', () => {
    beforeEach(() => {
        statusBanner.open();
        statusBanner.waitForComponent();
    });
    it('a11y - should test f-statusBanner component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-statusBanner');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
