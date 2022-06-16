import forEach from 'mocha-each';

const ContactPreferences = require('../../test-utils/component-objects/f-contactPreferences.component');

let contactPreferences;

describe('f-contact-preferences component tests', () => {
    beforeEach(() => {
        // Arrange
        contactPreferences = new ContactPreferences();
    });

    forEach([
        ['en-GB']
    ]).it('should display the  %s f-contact-preferences component', locale => {
        // Act
        contactPreferences.load({ locale });

        // Assert
        expect(contactPreferences.isComponentDisplayed()).toBe(true);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Submit success alert if Submit succeed', locale => {
        // Act
        contactPreferences.load({ locale });
        contactPreferences.clickNewsEmailCheckbox(); // dirty the form to allow submit
        contactPreferences.clickSubmitButton();
        contactPreferences.waitForComponent();

        // Assert
        expect(contactPreferences.isErrorAlertDisplayed()).toBe(false);
        expect(contactPreferences.isSuccessAlertDisplayed()).toBe(true);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Submit error alert if Submit fails', locale => {
        // Act
        contactPreferences.load({
            locale,
            apiState: 'post-preferences-fails'
        });
        contactPreferences.clickNewsEmailCheckbox(); // dirty the form to allow submit
        contactPreferences.clickSubmitButton();
        contactPreferences.waitForComponent();

        // Assert
        expect(contactPreferences.isSuccessAlertDisplayed()).toBe(false);
        expect(contactPreferences.isErrorAlertDisplayed()).toBe(true);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Error page if Load fails', locale => {
        // Act
        contactPreferences.load({
            locale,
            apiState: 'get-preferences-fails'
        });

        // Assert
        expect(contactPreferences.isErrorPageDisplayed()).toBe(true);
    });
});
