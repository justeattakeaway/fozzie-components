const forEach = require('mocha-each');

const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const Header = require('../../../test-utils/component-objects/f-header.component');

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
        header = new Header('organism', 'header-component');
        header.withQuery('&knob-Locale', formatLocale('gb'));
        header.withQuery('&knob-Show offers link', 'true');
        header.withQuery('&knob-Show delivery enquiry', 'true');
        const pageUrl = buildUrl(header.componentType, header.componentName, header.path);

        header.open(pageUrl);
        header.waitForComponent();

        if (process.env.JE_ENV !== 'browserstack') {
            browser.setWindowSize(500, 1000);
        }
    });

    forEach(['offersLink', 'delivery', 'help', 'countrySelector', 'userAccount'])
    .it('should display all navigation links', link => {
        // Act
        header.openMobileNavigationBar();

        // Assert
        expect(header.isNavigationLinkDisplayed(link)).toBe(true);
    });

    forEach(['au', 'ie', 'nz'])
    .it('should hide all navigation links but display offersIcon link, when in mobile mode', expectedLocale => {
        // Arrange
        header.withQuery('&knob-Locale', formatLocale(expectedLocale));
        header.withQuery('&knob-Show offers link', 'true');
        header.withQuery('&knob-Show delivery enquiry', 'true');
        const pageUrl = buildUrl(header.componentType, header.componentName, header.path);

        // Act
        header.open(pageUrl);
        header.waitForComponent();

        ['offersLink', 'delivery', 'userAccount', 'help', 'countrySelector'].forEach(link => {
            // Assert
            expect(header.isMobileNavigationBarDisplayed()).toBe(true);
            expect(header.isNavigationLinkDisplayed(link)).toBe(false);
            expect(header.isNavigationLinkDisplayed('offersIcon')).toBe(true);
        });
    });

    forEach(['it', 'es', 'dk', 'no'])
    .it('should hide all navigation links for country code "%s", as well as offersIcon, when in mobile mode', expectedLocale => {
        // Arrange
        header.withQuery('&knob-Locale', formatLocale(expectedLocale));
        header.withQuery('&knob-Show offers link', 'true');
        header.withQuery('&knob-Show delivery enquiry', 'true');
        const pageUrl = buildUrl(header.componentType, header.componentName, header.path);

        // Act
        header.open(pageUrl);
        header.waitForComponent();

        ['offersLink', 'delivery', 'userAccount', 'help', 'countrySelector'].forEach(link => {
            // Assert
            expect(header.isMobileNavigationBarDisplayed()).toBe(true);
            expect(header.isNavigationLinkDisplayed(link)).toBe(false);
        });
    });

    forEach(['au', 'ie', 'nz'])
    .it('should display navigation links for country code "%s" when burger menu is opened', expectedLocale => {
        // Arrange
        header.withQuery('&knob-Locale', formatLocale(expectedLocale));
        header.withQuery('&knob-Show offers link', 'true');
        header.withQuery('&knob-Show delivery enquiry', 'true');
        const pageUrl = buildUrl(header.componentType, header.componentName, header.path);

        // Act
        header.open(pageUrl);
        header.waitForComponent();

        ['offersLink', 'userAccount', 'help', 'countrySelector'].forEach(link => {
            header.openMobileNavigationBar();
            header.waitForComponent();

            // Assert
            expect(header.isNavigationLinkDisplayed(link)).toBe(true);
        });
    });

    forEach(['it', 'es', 'dk', 'no'])
    .it('should display the below navigation links for country code "%s" when menu has been opened', expectedLocale => {
        // Arrange
        header.withQuery('&knob-Locale', formatLocale(expectedLocale));
        header.withQuery('&knob-Show offers link', 'true');
        header.withQuery('&knob-Show delivery enquiry', 'true');
        const pageUrl = buildUrl(header.componentType, header.componentName, header.path);

        // Act
        header.open(pageUrl);
        header.waitForComponent();

        ['userAccount', 'help', 'countrySelector'].forEach(link => {
            header.openMobileNavigationBar();
            header.waitForComponent();

            // Assert
            expect(header.isNavigationLinkDisplayed(link)).toBe(true);
        });

        expect(header.isNavigationLinkDisplayed('offersLink')).toBe(false);
        expect(header.isNavigationLinkDisplayed('delivery')).toBe(false);
    });

    forEach(['au', 'gb', 'nz', 'ie', 'dk', 'es', 'it'])
    .it('should display all countries when in mobile mode', country => {
        // Act
        header.openMobileNavigationBar();
        header.openCountrySelector();
        header.expectedCountry = country;

        // Assert
        expect(header.isCountryLinkDisplayed()).toBe(true);
    });
});