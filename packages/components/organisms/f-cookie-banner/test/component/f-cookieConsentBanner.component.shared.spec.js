import forEach from 'mocha-each';

const CookieBanner = require('../../test-utils/component-objects/f-cookieConsentBanner.component');

let cookieBanner;

describe('New - f-cookieBanner component tests - @browserstack', () => {
    beforeEach(() => {
        cookieBanner = new CookieBanner();
        cookieBanner.withQuery('&knob-Locale', 'en-IE');

        cookieBanner.load();
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
            // Arrange
            cookieBanner = new CookieBanner();
            cookieBanner.withQuery('&knob-Locale', tenant);

            // Act
            cookieBanner.load();

            // Assert
            expect(cookieBanner.isCookieBannerComponentDisplayed()).toBe(true);
        });
});
