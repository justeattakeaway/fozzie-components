const FormField = require('../../test-utils/component-objects/f-form-field--visual.component');

let formField;

describe('f-form-field visual tests', () => {
    describe('default state', () => {
        it('should display all fields in the default state', () => {
            // Arrange
            formField = new FormField();

            // Act
            formField.load();

            // Assert
            browser.percyScreenshot('f-form-field - Base State', 'desktop');
        });
    });
    describe('disabled state', () => {
        it('should display all fields in a disabled state', () => {
            // Arrange
            formField = new FormField()
            .withQuery('&knob-isDisabled', true);

            // Act
            formField.load();

            // Assert
            browser.percyScreenshot('f-form-field - Disabled State', 'desktop');
        });
    });
    describe('errored state', () => {
        it('should display all fields in an errored state', () => {
            // Arrange
            formField = new FormField()
            .withQuery('&knob-hasError', true);

            // Act
            formField.load();

            // Assert
            browser.percyScreenshot('f-form-field - Errored State', 'desktop');
        });
    });
});
