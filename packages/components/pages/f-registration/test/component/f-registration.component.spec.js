import Registration from '../../test-utils/component-objects/f-registration.component';

let tests;

describe('Shared - f-registration component tests', () => {
    beforeEach(async () => {
        await Registration.load();
    });

    it('should display component', async () => {
        // Assert
        await expect(await Registration.isComponentDisplayed()).toBe(true);
    });

    tests = [
        'termsAndConditionsLink',
        'privacyPolicyLink',
        'cookiesPolicyLink'
    ];

    tests.forEach(link => {
        it(`should check if the ${link} is clickable`, async () => {
            // Assert
            await expect(await Registration.canBeClicked(link)).toBe(true);
        });
    });

    tests = [
        { linkName: 'termsAndConditionsLink', expectedUrl: 'info/terms-and-conditions' },
        { linkName: 'privacyPolicyLink', expectedUrl: 'info/privacy-policy' },
        { linkName: 'cookiesPolicyLink', expectedUrl: 'info/cookies-policy' }
    ];

    tests.forEach(({ linkName, expectedUrl }) => {
        it(`should take you to the ${expectedUrl} URL when clicking the ${linkName}`, async () => {
            // Arrange
            const expectedUrlRegex = new RegExp(`^http(s?)://localhost:\\d+/${expectedUrl}$`);

            // Act
            await Registration[linkName].click();
            await browser.switchWindow(expectedUrlRegex); // Link was opened in a new tab

            // Assert
            await expect(await browser.getUrl()).toMatch(expectedUrlRegex);
        });
    });
});
