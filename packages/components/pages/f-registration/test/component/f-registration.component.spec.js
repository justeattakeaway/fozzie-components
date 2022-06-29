const forEach = require('mocha-each');
const Registration = require('../../test-utils/component-objects/f-registration.component');

let registration;

describe('Shared - f-registration component tests', () => {
    beforeEach(() => {
        registration = new Registration();
        registration.load();
    });

    it('should display component', () => {
        // Assert
        expect(registration.isComponentDisplayed()).toBe(true);
    });

    forEach(['termsAndConditionsLink', 'privacyPolicyLink', 'cookiesPolicyLink'])
    .it('should check if the legal documentation is clickable', link => {
        // Assert
        expect(registration.canBeClicked(link)).toBe(true);
    });

    forEach([
        ['termsAndConditionsLink', 'info/terms-and-conditions'],
        ['privacyPolicyLink', 'info/privacy-policy'],
        ['cookiesPolicyLink', 'info/cookies-policy']
    ])
    .it('should take you to the correct URL when clicking the `%s`', (linkName, expectedUrl) => {
        // Arrange
        const expectedUrlRegex = new RegExp(`^http(s?)://localhost:\\d+/${expectedUrl}$`);

        // Act
        registration[linkName].click();
        browser.switchWindow(expectedUrlRegex); // Link was opened in a new tab

        // Assert
        expect(browser.getUrl()).toMatch(expectedUrlRegex);
    });
});
