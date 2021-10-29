import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const Spinner = require('../../test-utils/component-objects/f-spinner.component');

let spinner;

describe('Accessibility tests', () => {
    beforeEach(() => {
        spinner = new Spinner();

        spinner.load();
    });

    it('a11y - should test f-spinner component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-spinner');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
