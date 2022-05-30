import forEach from 'mocha-each';

const CookieBanner = require('../../test-utils/component-objects/f-cookie-consent-banner.component');

let cookieBanner;

describe('f-cookie-banner Desktop Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        cookieBanner = new CookieBanner();
        cookieBanner.withQuery('args', 'locale:en-IE');

        // Act
        cookieBanner.load();
    });

    // 'dk' and 'no' disabled for now
    forEach(['es-ES', 'en-IE', 'it-IT'])
    .it('should display the f-cookie-banner component for "%s"', tenant => {
        // Arrange
        cookieBanner = new CookieBanner();
        cookieBanner.withQuery('args', `locale:${tenant}`);

        // Act
        cookieBanner.load();

        // Assert
        browser.percyScreenshot(`f-cookie-banner - cookie-consent - ${tenant}`, 'desktop');
    });
});
