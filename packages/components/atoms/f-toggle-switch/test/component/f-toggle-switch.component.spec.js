import ToggleSwitch from '../../test-utils/component-objects/f-toggle-switch.component';

describe('f-toggle-switch - Component tests', () => {
    it('should display the f-toggle-switch component', async () => {
        // Act
        await ToggleSwitch.load();

        // Assert
        const result = await ToggleSwitch.isComponentDisplayed();
        await expect(result).toBe(true);
    });
});
