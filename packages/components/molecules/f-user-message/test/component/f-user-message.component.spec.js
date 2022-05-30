const UserMessage = require('../../test-utils/component-objects/f-user-message.component');

const userMessage = new UserMessage();

describe('f-user-message component tests', () => {
    beforeEach(async () => {
        await userMessage.load();
    });

    it('should display the user message component', async () => {
        // Assert
        await expect(await userMessage.isComponentDisplayed()).toBe(true);
    });

    it('should display the user message content', async () => {
        // Assert
        await expect(await userMessage.isContentDisplayed()).toBe(true);
    });
});
