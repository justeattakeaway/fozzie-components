const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');

const CookieBanner = require('../../../test-utils/component-objects/f-cookieBanner-legacy.component');

const cookieBanner = new CookieBanner('organism', 'cookie-banner-component');

describe('Legacy - f-cookieBanner component tests - @browserstack', () => {
    it('should display the f-cookieBanner component', () => {
        // Arrange
        cookieBanner.withQuery('&knob-Locale', 'en-GB');
        const pageUrl = buildUrl(cookieBanner.componentType, cookieBanner.componentName, cookieBanner.path);

        cookieBanner.open(pageUrl);
        cookieBanner.waitForComponent();

        // Assert
        expect(cookieBanner.isCookieBannerComponentDisplayed()).toBe(true);
    });
});
