import forEach from 'mocha-each';

const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const CookieBanner = require('../../../../test-utils/component-objects/f-cookieBanner-legacy.component');

const cookieBanner = new CookieBanner('organism', 'cookie-banner-component');

describe('Legacy - Multi-tenant - f-cookieBanner component tests', () => {
    forEach(['gb', 'au', 'nz'])
    .it('should display the f-cookieBanner component', tenant => {
        // Arrange
        const countryFormatted = tenant.toUpperCase();
        const formattedLocale = `en-${countryFormatted}`;
        cookieBanner.withQuery('&knob-Locale', formattedLocale);
        const pageUrl = buildUrl(cookieBanner.componentType, cookieBanner.componentName, cookieBanner.path);

        cookieBanner.open(pageUrl);

        // Assert
        expect(cookieBanner.isCookieBannerComponentDisplayed()).toBe(true);
    });
});
