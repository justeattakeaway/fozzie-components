import forEach from 'mocha-each';

const ContactPreferences = require('../../test-utils/component-objects/f-contactPreferences.component');

let contactPreferences;
const deviceType = 'mobile';

describe('f-contact-preferences - Mobile Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        contactPreferences = new ContactPreferences();
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s default component state', locale => {
        // Arrange
        contactPreferences.path += `&args=locale:${locale}`;

        // Act
        contactPreferences.load();

        // Assert
        browser.percyScreenshot(`f-contact-preferences - Base State - ${locale}`, deviceType);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s news email & sms checked', locale => {
        // Arrange
        contactPreferences.path += `&args=locale:${locale}`;

        // Act
        contactPreferences.load();
        contactPreferences.clickNewsEmailCheckbox();
        contactPreferences.clickNewsSmsCheckbox();

        // Assert
        browser.percyScreenshot(`f-contact-preferences - Checked Preferences State - ${locale}`, deviceType);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Submit success alert', locale => {
        // Arrange
        contactPreferences.path += `&args=locale:${locale}`;

        // Act
        contactPreferences.load();
        contactPreferences.clickNewsEmailCheckbox(); // dirty the form to allow submit
        contactPreferences.clickSubmitButton();
        contactPreferences.waitForComponent();

        // Assert
        browser.percyScreenshot(`f-contact-preferences - Submit Success Alert - ${locale}`, deviceType);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Submit error alert', locale => {
        // Arrange
        contactPreferences.path += `&args=locale:${locale};apiState:post-preferences-fails`;

        // Act
        contactPreferences.load();
        contactPreferences.clickNewsEmailCheckbox(); // dirty the form to allow submit
        contactPreferences.clickSubmitButton();
        contactPreferences.waitForComponent();

        // Assert
        browser.percyScreenshot(`f-contact-preferences - Submit Error Alert - ${locale}`, deviceType);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Load error page', locale => {
        // Arrange
        contactPreferences.path += `&args=locale:${locale};apiState:get-preferences-fails`;

        // Act
        contactPreferences.loadError();

        // Assert
        browser.percyScreenshot(`f-contact-preferences - Load Error Page - ${locale}`, deviceType);
    });
});
