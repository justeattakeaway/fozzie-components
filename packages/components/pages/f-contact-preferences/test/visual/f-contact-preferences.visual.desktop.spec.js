import forEach from 'mocha-each';

const ContactPreferences = require('../../test-utils/component-objects/f-contactPreferences.component');

let contactPreferences;
const deviceType = 'desktop';

describe('f-contact-preferences - Desktop Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        contactPreferences = new ContactPreferences();
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s default component state', locale => {
        // Arrange
        const controls = [`locale:${locale}`];
        contactPreferences.path += `&args=${controls}`;

        // Act
        contactPreferences.load();
        contactPreferences.waitForComponent();

        // Assert
        browser.percyScreenshot(`f-contact-preferences - Base State - ${locale}`, deviceType);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s news email & sms checked', locale => {
        // Arrange
        const controls = [`locale:${locale}`, 'isNewsEmailOptedIn:true', 'isNewsSmsOptedIn:true'];
        contactPreferences.path += `&args=${controls}`;

        contactPreferences.load();
        contactPreferences.waitForComponent();

        // Assert
        browser.percyScreenshot(`f-contact-preferences - Checked Preferences State - ${locale}`, deviceType);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Submit success alert', locale => {
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
        browser.percyScreenshot(`f-contact-preferences - Submit Success Alert - ${locale}`, deviceType);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Submit error alert', locale => {
        // Arrange
        const controls = [`locale:${locale}`, 'apiState:post-preferences-fails'].join(';');
        contactPreferences.path += `&args=${controls}`;

        // Act
        contactPreferences.load();
        contactPreferences.waitForComponent();
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
        const controls = [`locale:${locale}`, 'apiState:get-preferences-fails'].join(';');
        contactPreferences.path += `&args=${controls}`;

        // Act
        contactPreferences.loadError();

        // Assert
        browser.percyScreenshot(`f-contact-preferences - Load Error Page - ${locale}`, deviceType);
    });
});
