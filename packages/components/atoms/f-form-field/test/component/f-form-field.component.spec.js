const FormField = require('../../test-utils/component-objects/f-form-field.component');

const formfield = new FormField();

describe('f-form-field component tests', () => {
    beforeEach(async () => {
        await formfield.load();
    });

    it('should display f-form-field', async () => {
        // Assert
        await expect(await formfield.isComponentDisplayed()).toBe(true);
    });

    it('should display Label', async () => {
        // Assert
        await expect(await formfield.isLabelDisplayed()).toBe(true);
    });

    it('should display user input', async () => {
        // Arrange
        const userInput = {
            firstName: 'abcd'
        };

        // Act
        await formfield.addUserInput(userInput);

        // Assert
        await expect(await formfield.getUserInput()).toEqual('abcd');
    });
});
