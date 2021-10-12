import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const NavigationLinks = require('../../test-utils/component-objects/f-navigationLinks.component');

const navigationLinks = new NavigationLinks();

describe('Accessibility tests', () => {
    beforeEach(() => {
        navigationLinks.open();
        navigationLinks.waitForComponent();
    });
    it('a11y - should test f-navigationLinks component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-navigationLinks');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
