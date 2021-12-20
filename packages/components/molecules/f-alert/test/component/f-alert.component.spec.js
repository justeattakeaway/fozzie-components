const Alert = require('../../test-utils/component-objects/f-alert.component');

const alert = new Alert();

describe('f-alert component tests', () => {
    beforeEach(() => {
        alert.load();
    });

    it('should display the f-alert component', () => {
        // Assert
        expect(alert.isComponentDisplayed()).toBe(true);
    });

    it('should close alert when exit button is clicked', () => {
        // Act
        alert.clickExitButton();

        // Assert
        expect(alert.isComponentDisplayed()).toBe(false);
    });
});
