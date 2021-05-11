import forEach from 'mocha-each';

const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');

const Header = require('../../test-utils/component-objects/f-header.component');

let header;

function formatLocale (tenant) {
    const countryFormatted = tenant.toUpperCase();
    let formattedLocale = '';
    switch (countryFormatted) {
        case 'GB':
        case 'AU':
        case 'NZ':
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
    return formattedLocale;
}

describe('Mobile - f-header component tests - @browserstack', () => {
    beforeEach(() => {
        // Act
        header = new Header('organism', 'header-component');
        header.withQuery('&knob-Locale', 'en-GB');
        header.withQuery('&knob-Show offers link', 'true');
        header.withQuery('&knob-Show delivery enquiry', 'true');
        const pageUrl = buildUrl(header.componentType, header.componentName, header.path);
        header.open(pageUrl);
        header.openMobileNavigationBar();
        header.waitForComponent();

        if (process.env.JE_ENV !== 'browserstack') {
            browser.setWindowSize(500, 1000);
        }
    });

    forEach(['offersLink', 'delivery', 'help', 'countrySelector', 'userAccount'])
    .it('should open navigation and display link "%s"', link => {
        // Assert
        expect(header.isNavigationLinkDisplayed(link)).toBe(true);
    });

    forEach(['au', 'gb', 'nz', 'ie', 'dk', 'es', 'it'])
    .it('should open country selector and display country code "%s"', country => {
        // Act
        header.openCountrySelector();
        header.expectedCountry = country;

        // Assert
        expect(header.isCountryLinkDisplayed()).toBe(true);
    });

    forEach(['au', 'ie', 'nz'])
    .describe('closed navigation for country code "%s"', expectedLocale => {

        beforeEach(() => {
            // Act
            header.withQuery('&knob-Locale', formatLocale(expectedLocale));
            header.withQuery('&knob-Show offers link', 'true');
            header.withQuery('&knob-Show delivery enquiry', 'true');
            const pageUrl = buildUrl(header.componentType, header.componentName, header.path);
            header.open(pageUrl);
            header.waitForComponent();
        });

        forEach(['offersLink', 'delivery', 'userAccount', 'help', 'countrySelector'])
        .it('should not display "%s" navigation link', link => {
            // Assert
            expect(header.isNavigationLinkDisplayed(link)).toBe(false);
        });

        it('should display offersIcon link', () => {
            // Assert
            expect(header.isNavigationLinkDisplayed('offersIcon')).toBe(true);
        });
    });

    forEach(['au', 'ie', 'nz'])
    .describe('open navigation for country code "%s"', expectedLocale => {
        beforeEach(() => {
            // Act
            header.withQuery('&knob-Locale', formatLocale(expectedLocale));
            header.withQuery('&knob-Show offers link', 'true');
            header.withQuery('&knob-Show delivery enquiry', 'true');
            const pageUrl = buildUrl(header.componentType, header.componentName, header.path);
            header.open(pageUrl);
            header.openMobileNavigation();
            header.waitForComponent();
        });

        forEach(['offersLink', 'userAccount', 'help', 'countrySelector'])
        .it('should display navigation link "%s"', link => {
            // Assert
            expect(header.isNavigationLinkDisplayed(link)).toBe(true);
        });

        it('should not display offersIcon link', () => {
            // Assert
            expect(header.isNavigationLinkDisplayed('offersIcon')).toBe(false);
        });
    });

    forEach(['it', 'es', 'dk', 'no'])
    .describe('closed navigation for country code "%s"', expectedLocale => {
        beforeEach(() => {
            // Act
            header.withQuery('&knob-Locale', formatLocale(expectedLocale));
            header.withQuery('&knob-Show offers link', 'true');
            header.withQuery('&knob-Show delivery enquiry', 'true');
            const pageUrl = buildUrl(header.componentType, header.componentName, header.path);
            header.open(pageUrl);
            header.waitForComponent();
        });

        forEach(['offersLink', 'delivery', 'userAccount', 'help', 'countrySelector'])
        .it('should not display navigation link "%s",', link => {
            // Assert
            expect(header.isNavigationLinkDisplayed(link)).toBe(false);
        });

        it('should not display the offersIcon', () => {
            expect(header.isNavigationLinkDisplayed('offersIcon')).toBe(false);
        });
    });

    forEach(['it', 'es', 'dk', 'no'])
    .describe('open navigation for country code "%s"', expectedLocale => {
        beforeEach(() => {
            // Act
            header.withQuery('&knob-Locale', formatLocale(expectedLocale));
            header.withQuery('&knob-Show offers link', 'true');
            header.withQuery('&knob-Show delivery enquiry', 'true');
            const pageUrl = buildUrl(header.componentType, header.componentName, header.path);
            header.open(pageUrl);
            header.openMobileNavigation();
            header.waitForComponent();
        });


        forEach(['userAccount', 'help', 'countrySelector'])
        .it('should display navigation link "%s"', link => {
            // Assert
            expect(header.isNavigationLinkDisplayed(link)).toBe(true);
        });

        it('should not display the offers link', () => {
            // Assert
            expect(header.isNavigationLinkDisplayed('offersLink')).toBe(false);
        });

        it('should not display the delivery link', () => {
            // Assert
            expect(header.isNavigationLinkDisplayed('delivery')).toBe(false);
        });

        it('should not display the offersIcon link', () => {
            // Assert
            expect(header.isNavigationLinkDisplayed('offersIcon')).toBe(false);
        });
    });
});
