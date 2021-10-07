import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const IeCompatibility = require('../../test-utils/component-objects/f-ieCompatibility.component');
const ieCompatibility = new IeCompatibility();

describe('Accessibility tests', () => {
    beforeEach(() => {
        ieCompatibility.open();
        ieCompatibility.waitForComponent();
    });
    it('a11y - should test f-ieCompatibility component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-ieCompatibility');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
