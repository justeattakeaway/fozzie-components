const Alert = require('../../test-utils/component-objects/f-alert.component');

const alert = new Alert();

describe('f-alert component tests', () => {
    beforeEach(async () => {
        await alert.load();
    });

    it('should display the f-alert component', async () => {
        // Assert
        await expect(await alert.isComponentDisplayed()).toBe(true);
    });

    it('should close alert when exit button is clicked', async () => {
        // Act
        await alert.clickExitButton();

        // Assert
        await expect(await alert.isComponentDisplayed()).toBe(false);
    });

    it('should include aria-live attribute', async () => {
        // Assert
        const result = await alert.alertRootComponent();
        await expect(result).toHaveAttr('aria-live');
    });
});
