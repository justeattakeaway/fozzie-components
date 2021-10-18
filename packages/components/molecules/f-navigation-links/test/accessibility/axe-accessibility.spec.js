import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const NavigationLinks = require('../../test-utils/component-objects/f-navigationLinks.component');

let navigationLinks;

describe('Accessibility tests', () => {
    beforeEach(() => {
        navigationLinks = new NavigationLinks();

        navigationLinks.load();
    });

    it('a11y - should test f-navigationLinks component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-navigationLinks');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
