import CookieBanner from '../../test-utils/component-objects/f-cookie-banner-legacy.component';

describe('Legacy - f-cookie-banner component tests', () => {
    beforeEach(async () => {
        await CookieBanner.open('/');
        await browser.deleteCookies();
    });

    it('should display the f-cookie-banner legacy component', async () => {
        // Act
        await CookieBanner.load({ locale: 'en-AU', shouldShowLegacyBanner: true });

        // Assert
        await expect(await CookieBanner.isComponentDisplayed()).toBe(true);
    });

    it('should set "je-cookie_banner" cookie when dismissed.', async () => {
        // Act
        await CookieBanner.load({ locale: 'en-AU', shouldShowLegacyBanner: true });
        await CookieBanner.close();

        // Assert
        const [bannerCookie] = (await browser.getCookies()).filter(cookie => cookie.name === 'je-banner_cookie');
        await expect(bannerCookie.value).toBe('130315');
        await expect(await CookieBanner.isComponentDisplayed()).toBe(false);
    });

    const tests = [
        { locale: 'en-AU', expectedCookiePolicyUrl: 'au/info/privacy-policy#cookies_policy' },
        { locale: 'en-NZ', expectedCookiePolicyUrl: 'nz/info/privacy-policy#cookies_policy' }
    ];

    tests.forEach(({ locale, expectedCookiePolicyUrl }) => {
        it(`should go to the correct cookie policy page for "${locale}" - "${expectedCookiePolicyUrl}"`, async () => {
            // Act
            await CookieBanner.load({ locale, shouldShowLegacyBanner: true });
            await CookieBanner.clickCookiePolicyLink();

            // Assert
            await expect(await browser.getUrl()).toContain(expectedCookiePolicyUrl);
        });
    });
});
