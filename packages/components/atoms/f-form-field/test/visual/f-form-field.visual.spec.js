const FormField = require('../../test-utils/component-objects/f-form-field--visual.component');

describe('f-form-field visual tests', () => {
    let formField;

    beforeEach(async () => {
        // Arrange
        formField = new FormField();
    });

    describe('default state', () => {
        it('should display all fields in the default state', async () => {
            // Act
            await formField.load();

            // Assert
            await browser.percyScreenshot('f-form-field - Base State', 'desktop');
        });
    });

    describe('disabled state', () => {
        it('should display all fields in a disabled state', async () => {
            // Act
            await formField.load({ isDisabled: true });

            // Assert
            await browser.percyScreenshot('f-form-field - Disabled State', 'desktop');
        });
    });

    describe('errored state', () => {
        it('should display all fields in an errored state', async () => {
            // Act
            await formField.load({ hasError: true });

            // Assert
            await browser.percyScreenshot('f-form-field - Errored State', 'desktop');
        });
    });

    describe('none required state', () => {
        it('should display all fields in an none required state', async () => {
            // Act
            await formField.load({ isRequired: false });

            // Assert
            await browser.percyScreenshot('f-form-field - None required State', 'desktop');
        });
    });
});
