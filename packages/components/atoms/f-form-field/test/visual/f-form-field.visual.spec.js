const FormField = require('../../test-utils/component-objects/f-form-field--visual.component');

describe('f-form-field visual tests', () => {
    let formField;

    describe('default state', () => {
        it('should display all fields in the default state', async () => {
            // Arrange
            formField = new FormField();

            // Act
            await formField.load(formField.component);

            // Assert
            await browser.percyScreenshot('f-form-field - Base State', 'desktop');
        });
    });

    describe('disabled state', () => {
        it('should display all fields in a disabled state', async () => {
            // Arrange
            formField = await new FormField();

            // Act
            await formField.load(formField.component, { isDisabled: true });

            // Assert
            await browser.percyScreenshot('f-form-field - Disabled State', 'desktop');
        });
    });

    describe('errored state', () => {
        it('should display all fields in an errored state', async () => {
            // Arrange
            formField = await new FormField();

            // Act
            await formField.load(formField.component, { hasError: true });

            // Assert
            await browser.percyScreenshot('f-form-field - Errored State', 'desktop');
        });
    });
});
