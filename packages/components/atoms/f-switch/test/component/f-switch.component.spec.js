import Switch from '../../test-utils/component-objects/f-switch.component';

describe('f-switch - Component tests', () => {
    it('should display the f-switch component', async () => {
        // Act
        await Switch.load();

        // Assert
        const result = await Switch.isComponentDisplayed();
        await expect(result).toBe(true);
    });
});
