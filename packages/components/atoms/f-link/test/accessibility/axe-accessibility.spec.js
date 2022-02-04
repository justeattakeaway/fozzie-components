import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper'; // eslint-disable-line import/no-relative-packages

const Link = require('../../test-utils/component-objects/f-link.component');

const link = new Link();

describe('Accessibility tests', () => {
    beforeEach(() => {
        link.load();
    });
    it('a11y - should test f-link component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-link');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
