const forEach = require('mocha-each');
const Registration = require('../../test-utils/component-objects/f-registration.component');

let registration;

describe('Shared - f-registration component tests', () => {
    beforeEach(async () => {
        registration = new Registration();
        await registration.load();
    });

    it('should display component', async () => {
        // Assert
        await expect(await registration.isComponentDisplayed()).toBe(true);
    });

    forEach(['termsAndConditionsLink', 'privacyPolicyLink', 'cookiesPolicyLink'])
    .it('should check if the legal documentation is clickable', async link => {
        // Assert
        await expect(await registration.canBeClicked(link)).toBe(true);
    });

    forEach([
        ['termsAndConditionsLink', 'info/terms-and-conditions'],
        ['privacyPolicyLink', 'info/privacy-policy'],
        ['cookiesPolicyLink', 'info/cookies-policy']
    ])
    .it('should take you to the correct URL when clicking the `%s`', async (linkName, expectedUrl) => {
        // Arrange
        const expectedUrlRegex = new RegExp(`^http(s?)://localhost:\\d+/${expectedUrl}$`);

        // Act
        await registration[linkName].click();
        await browser.switchWindow(expectedUrlRegex); // Link was opened in a new tab

        // Assert
        await expect(await browser.getUrl()).toMatch(expectedUrlRegex);
    });
});
