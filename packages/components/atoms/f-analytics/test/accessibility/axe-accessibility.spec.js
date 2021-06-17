import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const AnalyticsComponent = require('../../test-utils/component-objects/f-analytics.component');

const analyticsComponent = new AnalyticsComponent();

describe('Accessibility tests', () => {
    beforeEach(() => {
        analyticsComponent.open();
        analyticsComponent.waitForComponent();
    });

    it('a11y - should test f-analytics component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-analytics');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
