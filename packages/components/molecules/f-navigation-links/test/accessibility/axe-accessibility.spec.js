import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const NavigationLinks = require('../../test-utils/component-objects/f-navigation-links.component');

let navigationLinks;

describe('Accessibility tests', () => {
    beforeEach(() => {
        navigationLinks = new NavigationLinks();

        navigationLinks.load();
    });

    it('a11y - should test f-navigation-links component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-navigation-links');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
