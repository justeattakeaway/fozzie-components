import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper'; // eslint-disable-line import/no-relative-packages

const Offers = require('../../test-utils/component-objects/f-offers.component');

const offers = new Offers();

describe('Accessibility tests', () => {
    beforeEach(() => {
        offers.load();
    });
    it('a11y - should test f-offers component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-offers');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
