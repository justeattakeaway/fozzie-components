import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const Spinner = require('../../test-utils/component-objects/f-spinner.component');

const spinner = new Spinner();

describe('Accessibility tests', () => {
    beforeEach(() => {
        spinner.open();
        spinner.waitForComponent();
    });
    it('a11y - should test f-spinner component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-spinner');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
