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

describe('Desktop - f-header component tests - @browserstack', () => {
    beforeEach(() => {
        header = new Header('organism', 'header-component');
        header.withQuery('&knob-Locale', formatLocale('gb'));
        header.withQuery('&knob-Show offers link', 'true');
        header.withQuery('&knob-Show delivery enquiry', 'true');
        const pageUrl = buildUrl(header.componentType, header.componentName, header.path);

        header.open(pageUrl);
        header.waitForComponent();
        browser.maximizeWindow();
    });

    forEach(['offersLink', 'delivery', 'help', 'countrySelector', 'userAccount'])
    .it('should display all navigation links', link => {
        // Assert
        expect(header.isNavigationLinkDisplayed(link)).toBe(true);
    });

    forEach(['au', 'ie', 'nz'])
    .it('should display the below navigation links for country code "%s"', expectedLocale => {
        // Arrange
        header.withQuery('&knob-Locale', formatLocale(expectedLocale));
        header.withQuery('&knob-Show offers link', 'true');
        header.withQuery('&knob-Show delivery enquiry', 'true');

        const pageUrl = buildUrl(header.componentType, header.componentName, header.path);
        // Act
        header.open(pageUrl);
        header.waitForComponent();
        ['offersLink', 'userAccount', 'help', 'countrySelector'].forEach(link => {
            // Assert
            expect(header.isNavigationLinkDisplayed(link)).toBe(true);
            expect(header.isNavigationLinkDisplayed('delivery')).toBe(false);
        });
    });

    forEach(['it', 'es', 'dk', 'no'])
    .it('should display the below navigation links', expectedLocale => {
        // Arrange
        header.withQuery('&knob-Locale', formatLocale(expectedLocale));
        header.withQuery('&knob-Show offers link', 'true');
        header.withQuery('&knob-Show delivery enquiry', 'true');
        const pageUrl = buildUrl(header.componentType, header.componentName, header.path);

        // Act
        header.open(pageUrl);
        header.waitForComponent();
        ['userAccount', 'help', 'countrySelector'].forEach(link => {
            // Assert
            expect(header.isNavigationLinkDisplayed(link)).toBe(true);
            expect(header.isNavigationLinkDisplayed('delivery')).toBe(false);
        });
    });

    forEach(['it', 'es', 'dk', 'no'])
    .it('should display the below navigation links for country code "%s"', expectedLocale => {
        // Arrange
        const headerData = {
            locale: expectedLocale,
            offers: true,
            delivery: true
        };

        ['userAccount', 'help', 'countrySelector'].forEach(link => {
            // Act
            header.open(headerData);
            header.waitForComponent();

            // Assert
            expect(header.isNavigationLinkDisplayed(link)).toBe(true);
            expect(header.isNavigationLinkDisplayed('offersLink')).toBe(false);
            expect(header.isNavigationLinkDisplayed('delivery')).toBe(false);
        });
    });

    forEach([
        ['gb', '.co.uk'],
        ['dk', '.dk'],
        ['no', '.no'],
        ['au', 'au'],
        ['at', 'at'],
        ['be', 'be-en'],
        ['bg', 'bg'],
        ['ca_en', 'skipthedishes.com'],
        ['jet_fr', '.fr'],
        ['de', '.de'],
        ['ie', '.ie'],
        ['il', '.il'],
        ['it', '.it']])
    .it('should display link for country code "%s" and redirect to correct URL', (expectedLocale, expectedUrl) => {
        // Act
        header.moveToCountrySelector();
        header.expectedCountry = expectedLocale;

        // Assert
        expect(header.isCountryLinkDisplayed()).toBe(true);

        // Act
        header.clickCountryListItem();

        // Assert
        expect(browser.getUrl()).toContain(expectedUrl);
    });

    forEach([
        ['lu', 'lu-en'],
        ['nl', '.nl'],
        ['nz', '.nz'],
        ['pl', '.pl'],
        ['pt', '/pt'],
        ['ro', '/ro'],
        ['es', '.es'],
        ['ch_ch', '.ch'],
        ['ch_en', '/en'],
        ['ch_fr', '/fr']])
    .it('should display link for country code "%s" and redirect to correct URL', (expectedLocale, expectedUrl) => {
        // Act
        header.moveToCountrySelector();
        header.expectedCountry = expectedLocale;

        // Assert
        expect(header.isCountryLinkDisplayed()).toBe(true);

        // Act
        header.clickCountryListItem();

        // Assert
        expect(browser.getUrl()).toContain(expectedUrl);
    });

    forEach(['au', 'gb', 'nz', 'ie', 'dk', 'es', 'it'])
    .it('should display correct selector icon for country code "%s depending on which locale is chosen', expectedLocale => {
        // Arrange
        header.withQuery('&knob-Locale', formatLocale(expectedLocale));
        header.withQuery('&knob-Show offers link', 'true');
        header.withQuery('&knob-Show delivery enquiry', 'true');
        const pageUrl = buildUrl(header.componentType, header.componentName, header.path);


        // Act
        header.open(pageUrl);
        header.waitForComponent();

        // Assert
        expect(header.isCurrentCountryIconDisplayed(expectedLocale)).toBe(true);
    });
});