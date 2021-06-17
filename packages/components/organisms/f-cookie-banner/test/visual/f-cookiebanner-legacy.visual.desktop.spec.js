const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');

const CookieBanner = require('../../test-utils/component-objects/f-cookieBanner-legacy.component');

const cookieBanner = new CookieBanner('organism', 'cookie-banner-component');

describe('Legacy - f-cookieBanner Desktop Visual Tests', () => {
    it('should display the f-cookieBanner component', () => {
        // Arrange
        cookieBanner.withQuery('&knob-Locale', 'en-GB');
        const pageUrl = buildUrl(cookieBanner.componentType, cookieBanner.componentName, cookieBanner.path);

        cookieBanner.open(pageUrl);
        cookieBanner.waitForComponent();

        // Assert
        browser.percyScreenshot('f-cookiebanner - Legacy', 'desktop');
    });
});
