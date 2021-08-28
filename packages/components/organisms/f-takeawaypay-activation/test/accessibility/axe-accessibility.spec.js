import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const TakeawaypayActivation = require('../../test-utils/component-objects/f-takeawaypayActivation.component');
const takeawaypayActivation = new TakeawaypayActivation();

describe('Accessibility tests', () => {
    beforeEach(() => {
        takeawaypayActivation.load();
    });
    it('a11y - should test f-takeawaypayActivation component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-takeawaypayActivation');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
