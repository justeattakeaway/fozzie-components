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
        contactPreferences.withQuery('&knob-Locale', locale);
        contactPreferences.load();
        contactPreferences.waitForComponent();

        // Assert
        expect(contactPreferences.isComponentDisplayed()).toBe(true);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Submit success alert if Submit succeed', locale => {
        // Arrange
        contactPreferences.withQuery('&knob-Locale', locale);
        contactPreferences.load();
        contactPreferences.waitForComponent();

        // Act
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
        expect(contactPreferences.isSuccessAlertDisplayed()).toBe(false);
        expect(contactPreferences.isErrorAlertDisplayed()).toBe(true);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Error page if Load fails', locale => {
        // Arrange
        contactPreferences
        .withQuery('&knob-Locale', locale)
        .withQuery('&knob-Set Api State', 'api-get-failed');

        // Act
        contactPreferences.load();
        contactPreferences.waitForComponent();

        // Assert
        expect(contactPreferences.isErrorPageDisplayed()).toBe(true);
    });
});
