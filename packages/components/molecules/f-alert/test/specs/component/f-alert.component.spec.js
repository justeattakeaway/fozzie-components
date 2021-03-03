const Alert = require('../../../test-utils/component-objects/f-alert.component');
const alert = new Alert();

describe('f-alert component tests', () => {
    beforeEach(() => {
        alert.open();
        alert.waitForComponent();
    });

    it('should display Alert', () => {
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
