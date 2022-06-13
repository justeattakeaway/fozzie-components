import forEach from 'mocha-each';

const ContactPreferences = require('../../test-utils/component-objects/f-contactPreferences.component');

let contactPreferences;

describe('f-contact-preferences component tests', () => {
    beforeEach(async () => {
        // Arrange
        contactPreferences = new ContactPreferences();
    });

    forEach([
        ['en-GB']
    ]).it('should display the  %s f-contact-preferences component', async locale => {
        // Arrange
        contactPreferences.path += `&args=locale:${locale}`;

        // Act
        await contactPreferences.load();

        // Assert
        await expect(await contactPreferences.isComponentDisplayed()).toBe(true);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Submit success alert if Submit succeed', async locale => {
        // Arrange
        contactPreferences.path += `&args=locale:${locale}`;

        // Act
        await contactPreferences.load();
        await contactPreferences.clickNewsEmailCheckbox(); // dirty the form to allow submit
        await contactPreferences.clickSubmitButton();
        await contactPreferences.waitForComponent();

        // Assert
        await expect(await contactPreferences.isErrorAlertDisplayed()).toBe(false);
        await expect(await contactPreferences.isSuccessAlertDisplayed()).toBe(true);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Submit error alert if Submit fails', async locale => {
        // Arrange
        contactPreferences.path += `&args=locale:${locale};apiState:post-preferences-fails`;

        // Act
        await contactPreferences.load();
        await contactPreferences.clickNewsEmailCheckbox(); // dirty the form to allow submit
        await contactPreferences.clickSubmitButton();
        await contactPreferences.waitForComponent();

        // Assert
        await expect(await contactPreferences.isSuccessAlertDisplayed()).toBe(false);
        await expect(await contactPreferences.isErrorAlertDisplayed()).toBe(true);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Error page if Load fails', async locale => {
        // Arrange
        contactPreferences.path += `&args=locale:${locale};apiState:get-preferences-fails`;

        // Act
        await contactPreferences.loadError();

        // Assert
        await expect(await contactPreferences.isErrorPageDisplayed()).toBe(true);
    });
});
