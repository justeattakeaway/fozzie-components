import forEach from 'mocha-each';

const { getAxeResults } = require('../../../../../../test/utils/axe-helper');

const LegacyCookieBanner = require('../../test-utils/component-objects/f-cookie-banner-legacy.component');

const legacyCookieBanner = new LegacyCookieBanner();

const CookieConsentBanner = require('../../test-utils/component-objects/f-cookie-consent-banner.component');

let cookieConsentBanner;

describe('Legacy Accessibility tests', () => {
    it('a11y - should test legacy f-cookie-banner component WCAG compliance', () => {
        // Arrange
        legacyCookieBanner.withQuery('args', 'locale:en-AU');

        // Act
        browser.call(async () => {
            await legacyCookieBanner.load();
        });

        const axeResults = getAxeResults('f-cookie-banner');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test the f-cookie-banner component WCAG compliance', () => {
        // Arrange
        cookieConsentBanner = new CookieConsentBanner();
        cookieConsentBanner.withQuery('args', 'locale:en-GB');

        // Act
        browser.call(async () => {
            await legacyCookieBanner.load();
        });

        const axeResults = getAxeResults('f-cookie-banner');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    forEach([
        ['en-GB'],
        ['en-IE'],
        ['es-ES'],
        ['it-IT']
    ])
        .it('a11y - should have a correct tab loop order in the cookie banner component', tenant => {
            // Arrange
            cookieConsentBanner = new CookieConsentBanner();
            cookieConsentBanner.withQuery('args', `locale:${tenant}`);

            // Act

            browser.call(async () => {
                await legacyCookieBanner.load();
            });

            const expectedTabOrder = [
                cookieConsentBanner.cookiePolicyLink,
                cookieConsentBanner.cookieAcceptAllButton,
                cookieConsentBanner.cookieAcceptNecessaryButton,
                cookieConsentBanner.cookieBannerTitle];
            const result = cookieConsentBanner.testTabOrder(expectedTabOrder);

            // Assert
            expect(result.actual).toEqual(result.expected);
        });
});
