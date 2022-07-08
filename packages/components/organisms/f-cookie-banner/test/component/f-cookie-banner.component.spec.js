import CookieBanner from '../../test-utils/component-objects/f-cookie-banner.component';

describe('f-cookie-banner component tests', () => {
    beforeEach(async () => {
        await CookieBanner.open('/');
        await browser.deleteCookies();
    });

    const expectedCookieValues = [
        'full',
        'necessary'
    ];

    expectedCookieValues.forEach(expectedCookieValue => {
        it('should set "je-cookie_banner" and "je-cookieConsent" to expected cookie value"', async () => {
            // Act
            await CookieBanner.load({ locale: 'en-IE' });
            await CookieBanner.acceptCookies(expectedCookieValue);

            // Arrange
            const [bannerCookie] = (await browser.getCookies()).filter(cookie => cookie.name === 'je-banner_cookie');
            const [bannerConsent] = (await browser.getCookies()).filter(cookie => cookie.name === 'je-cookieConsent');

            // Assert
            await expect(await bannerCookie.value).toBe('130315');
            await expect(await bannerConsent.value).toBe(expectedCookieValue);
        });
    });


    const locales = [
        'es-ES',
        'en-IE',
        'it-IT',
        'en-GB'
    ];

    locales.forEach(locale => {
        it(`should display the f-cookie-banner component for "${locale}"`, async () => {
            // Act
            await CookieBanner.load({ locale });

            // Assert
            await expect(await CookieBanner.isComponentDisplayed()).toBe(true);
        });
    });

    const tests = [
        { loclae: 'en-GB', expectedCookiePolicyUrl: 'uk/info/cookies-policy' },
        { locale: 'es-ES', expectedCookiePolicyUrl: 'es/info/politica-de-cookies' },
        { locale: 'en-IE', expectedCookiePolicyUrl: 'ie/info/cookies-policy' },
        { locale: 'it-IT', expectedCookiePolicyUrl: 'it/informazioni/politica-dei-cookie' }
    ];

    tests.forEach(({ locale, expectedCookiePolicyUrl }) => {
        it('should go to the correct cookie policy page', async () => {
            // Act
            await CookieBanner.load({ locale });

            // Assert
            await expect(await CookieBanner.getCookiePolicyUrl()).toContain(expectedCookiePolicyUrl);
        });
    });
});
