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
        // Arrange
        const controls = [`locale:${locale}`];
        contactPreferences.path += `&args=${controls}`;

        // Act
        contactPreferences.load();
        contactPreferences.waitForComponent();

        // Assert
        expect(contactPreferences.isComponentDisplayed()).toBe(true);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Submit success alert if Submit succeed', locale => {
        // Arrange
        const controls = [`locale:${locale}`];
        contactPreferences.path += `&args=${controls}`;

        // Act
        contactPreferences.load();
        contactPreferences.waitForComponent();
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
        // Arrange
        const controls = [`locale:${locale}`, 'apiState:post-preferences-fails'].join(';');
        contactPreferences.path += `&args=${controls}`;

        // Act
        contactPreferences.load();
        contactPreferences.waitForComponent();
        contactPreferences.clickNewsEmailCheckbox(); // dirty the form to allow submit
        contactPreferences.clickSubmitButton();
        contactPreferences.waitForComponent();

        browser.pause(3000);

        // Assert
        expect(contactPreferences.isSuccessAlertDisplayed()).toBe(false);
        expect(contactPreferences.isErrorAlertDisplayed()).toBe(true);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Error page if Load fails', locale => {
        // Arrange
        const controls = [`locale:${locale}`, 'apiState:get-preferences-fails'].join(';');
        contactPreferences.path += `&args=${controls}`;

        // Act
        contactPreferences.load();
        contactPreferences.waitForComponent();

        // Assert
        expect(contactPreferences.isErrorPageDisplayed()).toBe(true);
    });
});
