import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const GtmAnalytics = require('../../test-utils/component-objects/f-analytics.component');

const analytics = new GtmAnalytics();

describe('Accessibility tests', () => {
    beforeEach(() => {
        analytics.open();
        analytics.waitForComponent();
    });
    it('a11y - should test f-analytics component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-analytics');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
