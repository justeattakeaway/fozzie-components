const FormField = require('../../../test-utils/component-objects/f-form-field.component');
const formfield = new FormField();

describe('f-form-field component tests', () => {
    beforeEach(() => {
        formfield.open();
        formfield.waitForComponent();
    });

    it('should display f-form-field', () => {
        // Assert
        expect(formfield.isComponentDisplayed()).toBe(true);
    });

    it('should display Label', () => {
        // Assert
        expect(formfield.isLabelDisplayed()).toBe(true);
    });

    it('should display user input', () => {
        // Arrange
        const userInput = {
            firstName: 'abcd'
        };

        // Act
        formfield.addUserInput(userInput);

        // Assert
        expect(formfield.isUserInputDisplayed()).toBe(true);
    });
});
