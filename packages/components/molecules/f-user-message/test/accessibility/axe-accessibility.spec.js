const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const UserMessage = require('../../test-utils/component-objects/f-user-message.component');

const userMessage = new UserMessage('molecule', 'user-message-component');

describe('Accessibility tests', () => {
    beforeEach(() => {
        const pageUrl = buildUrl(userMessage.componentType, userMessage.componentName, userMessage.path);
        userMessage.open(pageUrl);
        userMessage.waitForComponent();
    });

    it('a11y - should test f-user-message component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-user-message');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
