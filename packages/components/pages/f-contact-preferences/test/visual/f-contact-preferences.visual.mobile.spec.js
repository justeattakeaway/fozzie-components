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
        // Act
        contactPreferences.withQuery('&knob-Locale', locale);
        contactPreferences.load();
        contactPreferences.waitForComponent();

        // Assert
        browser.percyScreenshot(`f-contact-preferences - Base State - ${locale}`, deviceType);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s news email & sms checked', locale => {
        // Arrange
        contactPreferences
            .withQuery('&knob-Locale', locale)
            .withQuery('&knob-News - Email - Opted In', 'true')
            .withQuery('&knob-News - Sms - Opted In', 'true');
        contactPreferences.load();
        contactPreferences.waitForComponent();

        // Assert
        browser.percyScreenshot(`f-contact-preferences - Checked Preferences State - ${locale}`, deviceType);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Submit success alert', locale => {
        // Arrange
        contactPreferences
            .withQuery('&knob-Locale', locale);
        contactPreferences.load();
        contactPreferences.waitForComponent();

        // Act
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
        contactPreferences
            .withQuery('&knob-Locale', locale)
            .withQuery('&knob-Set Api State', 'api-post-failed');
        contactPreferences.load();
        contactPreferences.waitForComponent();

        // Act
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
        contactPreferences
            .withQuery('&knob-Locale', locale)
            .withQuery('&knob-Set Api State', 'api-get-failed');

        // Act
        contactPreferences.load();
        contactPreferences.waitForComponent();

        // Assert
        browser.percyScreenshot(`f-contact-preferences - Load Error Page - ${locale}`, deviceType);
    });
});
