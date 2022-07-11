import Alert from '../../test-utils/component-objects/f-alert.component';

describe('f-alert component tests', () => {
    beforeEach(async () => {
        await Alert.load();
    });

    it('should display the f-alert component', async () => {
        // Assert
        await expect(await Alert.isComponentDisplayed()).toBe(true);
    });

    it('should close alert when exit button is clicked', async () => {
        // Act
        await Alert.clickExitButton();

        // Assert
        await expect(await Alert.isComponentDisplayed()).toBe(false);
    });

    it('should include aria-live attribute', async () => {
        // Assert
        const result = await Alert.alertRootComponent();
        await expect(result).toHaveAttr('aria-live');
    });
});
