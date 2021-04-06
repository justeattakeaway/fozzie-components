import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
const Searchbox = require('../../../test-utils/component-objects/f-searchbox.component');
const searchbox = new Searchbox();

describe('Accessibility tests', () => {
    beforeEach(() => {
        searchbox.open();
        searchbox.waitForComponent();
    });
    it('a11y - should test f-searchbox component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-searchbox');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
