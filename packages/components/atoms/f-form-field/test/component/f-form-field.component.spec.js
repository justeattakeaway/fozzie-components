import FormField from'../../test-utils/component-objects/f-form-field.component';

describe('f-form-field component tests', () => {
    beforeEach(async () => {
        await FormField.load();
    });

    it('should display f-form-field', async () => {
        // Assert
        await expect(await FormField.isComponentDisplayed()).toBe(true);
    });

    it('should display Label', async () => {
        // Assert
        await expect(await FormField.isLabelDisplayed()).toBe(true);
    });

    it('should display user input', async () => {
        // Arrange
        const userInput = {
            firstName: 'abcd'
        };

        // Act
        await FormField.addUserInput(userInput);

        // Assert
        await expect(await FormField.getUserInput()).toEqual('abcd');
    });
});
