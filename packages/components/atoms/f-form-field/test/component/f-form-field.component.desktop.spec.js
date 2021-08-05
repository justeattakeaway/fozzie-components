const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const FormField = require('../../test-utils/component-objects/f-form-field.component');

const formfield = new FormField('atom-folder', 'f-form-field--form-field-component');

describe('f-form-field component tests', () => {
    beforeEach(() => {
        const pageUrl = buildUrl(formfield.componentType, formfield.componentName, formfield.path);
        formfield.open(pageUrl);
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
        expect(formfield.getUserInput()).toEqual('abcd');
    });
});
