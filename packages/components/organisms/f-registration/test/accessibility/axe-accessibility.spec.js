const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');
const Registration = require('../../test-utils/component-objects/f-registration.component');

const registration = new Registration('organism', 'registration-component');


describe('Accessibility tests', () => {
    beforeEach(() => {
        const pageUrl = buildUrl(registration.componentType, registration.componentName, registration.path);
        registration.open(pageUrl);
        registration.waitForComponent();
    });

    it('a11y - should test f-registration component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-registration');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
