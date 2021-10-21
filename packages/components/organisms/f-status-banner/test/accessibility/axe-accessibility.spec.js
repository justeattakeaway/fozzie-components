const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const StatusBanner = require('../../test-utils/component-objects/f-statusBanner.component');

let statusBanner;

describe('Accessibility tests', () => {
    beforeEach(() => {
        statusBanner = new StatusBanner();
        statusBanner.load();
    });
    it('a11y - should test f-statusBanner component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-statusBanner');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
