import forEach from 'mocha-each';

const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const CookieBanner = require('../../test-utils/component-objects/f-cookieConsentBanner.component');

let cookieBanner;

describe('New - f-cookieBanner component tests - @browserstack', () => {
    beforeEach(() => {
        cookieBanner = new CookieBanner('organism', 'cookie-banner-component');
        cookieBanner.withQuery('&knob-Locale', 'en-IE');
        const pageUrl = buildUrl(cookieBanner.componentType, cookieBanner.componentName, cookieBanner.path);

        cookieBanner.open(pageUrl);
        cookieBanner.waitForComponent();
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
    forEach(['es', 'ie', 'it'])
    .it('should display the f-cookieBanner component for "%s"', tenant => {
        // Arrange
        const countryFormatted = tenant.toUpperCase();
        let formattedLocale = '';
        switch (countryFormatted) {
            case 'IE':
                formattedLocale = `en-${countryFormatted}`;
                break;
            case 'DK':
                formattedLocale = `da-${countryFormatted}`;
                break;
            case 'ES':
                formattedLocale = `es-${countryFormatted}`;
                break;
            case 'IT':
                formattedLocale = `it-${countryFormatted}`;
                break;
            case 'NO':
                formattedLocale = `nb-${countryFormatted}`;
                break;
            default:
                throw new Error(`locale ${countryFormatted} is not supported`);
        }

        cookieBanner = new CookieBanner('organism', 'cookie-banner-component');
        cookieBanner.withQuery('&knob-Locale', formattedLocale);
        const pageUrl = buildUrl(cookieBanner.componentType, cookieBanner.componentName, cookieBanner.path);

        cookieBanner.open(pageUrl);
        browser.deleteAllCookies();
        browser.refresh();
        cookieBanner.waitForComponent();

        // Assert
        expect(cookieBanner.isCookieBannerComponentDisplayed()).toBe(true);
    });
});
