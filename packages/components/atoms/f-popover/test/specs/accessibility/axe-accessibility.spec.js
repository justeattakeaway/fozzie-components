const Popover = require('../../../test-utils/component-objects/f-popover.component');
const popover = new Popover();
import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';

describe('Accessibility tests', () => {
    beforeEach(() => {
        popover.open();
        popover.waitForComponent();
    });
    it('a11y - should test f-popover component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-popover');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
