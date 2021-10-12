import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const Compatibility = require('../../test-utils/component-objects/f-compatibility.component');

const compatibility = new Compatibility();

describe('Accessibility tests', () => {
    beforeEach(() => {
        compatibility.load();
    });
    it('a11y - should test f-compatibility component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-compatibility');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
