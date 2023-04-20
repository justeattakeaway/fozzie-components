import Toggle from '../../test-utils/component-objects/f-toggle.component';

describe('f-toggle - Component tests', () => {
    it('should display the f-toggle component', async () => {
        // Act
        await Toggle.load();

        // Assert
        const result = await Toggle.isComponentDisplayed();
        await expect(result).toBe(true);
    });
});
