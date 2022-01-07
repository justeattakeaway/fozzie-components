import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const Loyalty = require('../../test-utils/component-objects/f-loyalty.component');

const loyalty = new Loyalty();

describe('Accessibility tests', () => {
    beforeEach(() => {
        loyalty.load();
    });
    it('a11y - should test f-loyalty component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-loyalty');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
