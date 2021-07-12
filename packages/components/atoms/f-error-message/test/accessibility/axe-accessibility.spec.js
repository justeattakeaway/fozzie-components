const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const ErrorMessage = require('../../test-utils/component-objects/f-error-message.component');

const errorMessage = new ErrorMessage('atom', 'error-message-component');

describe('Accessibility tests', () => {
    beforeEach(() => {
        const pageUrl = buildUrl(errorMessage.componentType, errorMessage.componentName, errorMessage.path);
        errorMessage.open(pageUrl);
        errorMessage.waitForComponent();
    });

    it('a11y - should test f-error-message component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-error-message');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
