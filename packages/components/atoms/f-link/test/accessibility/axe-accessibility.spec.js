import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const Link = require('../../test-utils/component-objects/f-link.component');
const link = new Link

describe('Accessibility tests', () => {
    beforeEach(() => {
        link.open();
        link.waitForComponent();
    });
    it('a11y - should test f-link component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-link');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
