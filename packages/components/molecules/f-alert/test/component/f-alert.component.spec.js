const Alert = require('../../test-utils/component-objects/f-alert.component');

let alert;

describe('f-alert component tests', () => {
    beforeEach(async () => {
        alert = new Alert();
        await alert.load();
    });

    it('should display the f-alert component', async () => {
        const result = await alert.isComponentDisplayed();

        // Assert
        expect(result).toBe(true);
    });

    it('should close alert when exit button is clicked', async () => {
        // Act
        await alert.clickExitButton();

        const result = await alert.isComponentDisplayed();

        // Assert
        expect(result).toBe(false);
    });
});
