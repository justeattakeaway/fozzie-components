import forEach from 'mocha-each';

const ContactPreferences = require('../../test-utils/component-objects/f-contactPreferences.component');

let contactPreferences;

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
        browser.percyScreenshot(`f-contact-preferences - Base State - ${locale}`, 'mobile');
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
        browser.percyScreenshot(`f-contact-preferences - Checked Preferences State - ${locale}`, 'mobile');
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s error page', locale => {
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
        browser.percyScreenshot(`f-contact-preferences - Error State - ${locale}`, 'mobile');
    });
});
