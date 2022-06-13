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
            formField = new FormField()
            .withQuery('args', 'isDisabled:disabled');

            // Act
            await formField.load(formField.component);

            // Assert
            await browser.percyScreenshot('f-form-field - Disabled State', 'desktop');
        });
    });

    describe('errored state', () => {
        it('should display all fields in an errored state', async () => {
            // Arrange
            formField = new FormField()
            .withQuery('args', 'hasError:true');

            // Act
            await formField.load(formField.component);

            // Assert
            await browser.percyScreenshot('f-form-field - Errored State', 'desktop');
        });
    });

    describe('none required state', () => {
        it('should display all fields in an none required state', async () => {
            // Arrange
            formField = new FormField()
            .withQuery('args', 'isRequired:false');

            // Act
            await formField.load(formField.component);

            // Assert
            await browser.percyScreenshot('f-form-field - None required State', 'desktop');
        });
    });
});
