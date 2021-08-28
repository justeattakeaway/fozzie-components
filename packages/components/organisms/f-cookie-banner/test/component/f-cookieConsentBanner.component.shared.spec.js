import forEach from 'mocha-each';

const CookieBanner = require('../../test-utils/component-objects/f-cookieConsentBanner.component');

let cookieBanner = new CookieBanner();

describe('New - f-cookieBanner component tests - @browserstack', () => {
    beforeEach(() => {
        cookieBanner.load({ 'Locale': 'en-IE' });
    });

    it('should display the f-cookieBanner content', () => {
        // Assert
        expect(cookieBanner.isCookieBannerContentDisplayed()).toBe(true);
    });

    it('should display the f-cookieBanner accept all button', () => {
        // Assert
        expect(cookieBanner.isCookieBannerAcceptAllButtonDisplayed()).toBe(true);
    });

    it('should display the f-cookieBanner accept necessary button', () => {
        // Assert
        expect(cookieBanner.isCookieBannerAcceptNecessaryButtonDisplayed()).toBe(true);
    });

    // 'dk' and 'no' disabled for now
    forEach(['es-ES', 'en-IE', 'it-IT', 'en-GB'])
        .it('should display the f-cookieBanner component for "%s"', tenant => {
            // Act
            cookieBanner.load({ 'Locale': tenant });

            // Assert
            expect(cookieBanner.isCookieBannerComponentDisplayed()).toBe(true);
        });
});
