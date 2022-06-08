const { getAxeResults } = require('../../../../../../test/utils/axe-helper');

const UserMessage = require('../../test-utils/component-objects/f-user-message.component');

const userMessage = new UserMessage();

describe('Accessibility tests', () => {
    beforeEach(async () => {
        await userMessage.load();
    });

    it('a11y - should test f-user-message component WCAG compliance', () => {
        // Act
        const axeResults = getAxeResults('f-user-message');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
