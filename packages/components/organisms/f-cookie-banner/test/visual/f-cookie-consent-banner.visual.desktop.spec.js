import forEach from 'mocha-each';

const CookieBanner = require('../../test-utils/component-objects/f-cookie-consent-banner.component');

let cookieBanner;

describe('f-cookie-banner Desktop Visual Tests', () => {
    beforeEach(async () => {
        // Arrange
        cookieBanner = new CookieBanner();
        await cookieBanner.withQuery('args', 'locale:en-IE');

        // Act
        await cookieBanner.load();
    });

    // 'dk' and 'no' disabled for now
    forEach(['es-ES', 'en-IE', 'it-IT'])
    .it('should display the f-cookie-banner component for "%s"', async tenant => {
        // Arrange
        cookieBanner = new CookieBanner();
        await cookieBanner.withQuery('args', `locale:${tenant}`);

        // Act
        await cookieBanner.load();

        // Assert
        await browser.percyScreenshot(`f-cookie-banner - cookie-consent - ${tenant}`, 'desktop');
    });
});
