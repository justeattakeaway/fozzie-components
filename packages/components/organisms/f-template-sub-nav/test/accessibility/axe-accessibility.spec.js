import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const TemplateSubNav = require('../../test-utils/component-objects/f-templateSubNav.component');

let templateSubNav;

describe('Accessibility tests', () => {
    beforeEach(() => {
        templateSubNav = new TemplateSubNav();

        templateSubNav.load();
    });

    it('a11y - should test f-templateSubNav component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-templateSubNav');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
