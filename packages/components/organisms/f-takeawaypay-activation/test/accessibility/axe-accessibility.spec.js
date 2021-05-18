import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const TakeawayPayActivation = require('../../test-utils/component-objects/f-takeawayPayActivation.component');
const takeawayPayActivation = new TakeawayPayActivation();

describe('Accessibility tests', () => {
    beforeEach(() => {
        takeawayPayActivation.open();
        takeawayPayActivation.waitForComponent();
    });
    it('a11y - should test f-takeawayPayActivation component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-takeawayPayActivation');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
