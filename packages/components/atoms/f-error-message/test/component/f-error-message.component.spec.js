import ErrorMessage from '../../test-utils/component-objects/f-error-message.component';

describe('f-error-message component tests', () => {
    it('should display the f-error-message component', async () => {
        // Arrange
        await ErrorMessage.load();
        
        // Assert
        await expect(await ErrorMessage.isComponentDisplayed()).toBe(true);
    });
});
