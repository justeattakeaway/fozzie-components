import UserMessage from '../../test-utils/component-objects/f-user-message.component';

describe('f-user-message component tests', () => {
    beforeEach(async () => {
        await UserMessage.load();
    });

    it('should display the user message component', async () => {
        // Assert
        await expect(await UserMessage.isComponentDisplayed()).toBe(true);
    });

    it('should display the user message content', async () => {
        // Assert
        await expect(await UserMessage.isContentDisplayed()).toBe(true);
    });
});
