const forEach = require('mocha-each');

const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const Footer = require('../../../../test-utils/component-objects/f-footer.component');

const footer = new Footer('organism', 'footer-component');

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

describe('Shared - f-footer component tests', () => {
    beforeEach(() => {
        footer.withQuery('&knob-Locale', 'en-gb');
        footer.withQuery('&knob-Show courier links', 'false');
        footer.withQuery('&knob-Show country selector', 'true');
        const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);

        footer.open(pageUrl);
        footer.waitForComponent();
    });

    it('should display the footer', () => {
        // Assert
        expect(footer.isComponentDisplayed()).toBe(true);
    });

    forEach(['gb', 'au', 'ie', 'nz', 'dk', 'es', 'it', 'no'])
    .it('should not show courier links and country selector when options are unselected', expectedLocale => {
        // Arrange
        footer.withQuery('&knob-Locale', formatLocale(expectedLocale));
        footer.withQuery('&knob-Show courier links', 'false');
        footer.withQuery('&knob-Show country selector', 'false');
        const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);

        // Act
        footer.open(pageUrl);
        footer.waitForComponent();

        // Assert
        expect(footer.areCourierLinksDisplayed()).toBe(false);
        expect(footer.isCountrySelectorDisplayed()).toBe(false);
    });

    forEach(['au', 'ie', 'nz'])
    .it('should show courier links when option is selected', expectedLocale => {
        // Arrange
        footer.withQuery('&knob-Locale', formatLocale(expectedLocale));
        footer.withQuery('&knob-Show courier links', 'true');
        footer.withQuery('&knob-Show country selector', 'false');
        const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);

        // Act
        footer.open(pageUrl);
        footer.waitForComponent();

        // Assert
        expect(footer.areCourierLinksDisplayed()).toBe(true);
    });

    forEach(['gb', 'es', 'it', 'no'])
    .it('should never show courier links, even when option is selected', expectedLocale => {
        // Arrange
        footer.withQuery('&knob-Locale', formatLocale(expectedLocale));
        footer.withQuery('&knob-Show courier links', 'true');
        footer.withQuery('&knob-Show country selector', 'false');
        const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);

        // Act
        footer.open(pageUrl);
        footer.waitForComponent();

        // Assert
        expect(footer.areCourierLinksDisplayed()).toBe(false);
    });

    forEach(['au', 'ie', 'nz', 'dk', 'es', 'it', 'no'])
    .it('should always show country selector when selected', expectedLocale => {
        // Arrange
        footer.withQuery('&knob-Locale', formatLocale(expectedLocale));
        footer.withQuery('&knob-Show courier links', 'false');
        footer.withQuery('&knob-Show country selector', 'true');
        const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);

        // Act
        footer.open(pageUrl);
        footer.waitForComponent();

        // Assert
        expect(footer.isCountrySelectorDisplayed()).toBe(true);
    });

    forEach(['au', 'gb', 'nz', 'ie', 'dk', 'es', 'it'])
    .it('should display the corresponding icon for each locale selected', expectedLocale => {
        // Arrange
        footer.withQuery('&knob-Locale', formatLocale(expectedLocale));
        footer.withQuery('&knob-Show courier links', 'false');
        footer.withQuery('&knob-Show country selector', 'true');
        const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);

        // Act
        footer.open(pageUrl);
        footer.waitForComponent();

        // Assert
        expect(footer.isCurrentCountryIconDisplayed(expectedLocale)).toBe(true);
    });

    forEach([['au', 'au'], ['at', 'at'], ['be', 'be-en'], ['bg', 'bg'], ['ca_en', 'skipthedishes.com'], ['ca_fr', 'skipthedishes.com/fr'], ['dk', '.dk'], ['jet_fr', '.fr'], ['de', '.de'], ['ie', '.ie'], ['il', '.il'], ['it', '.it'],
        ['lu', 'lu-en'], ['nl', '.nl'], ['nz', '.nz'], ['no', '.no'], ['pl', '.pl'], ['pt', '/pt'], ['ro', '/ro'], ['es', '.es'], ['ch_ch', '.ch'], ['ch_en', '/en'], ['ch_fr', '/fr']])
    .it('should display all countries and redirect to correct URL', (country, expectedUrl) => {
        // Act
        footer.clickCountrySelectorButton();
        footer.expectedCountry = country;

        // Assert
        expect(footer.isCountryLinkItemDisplayed()).toBe(true);

        // Act
        footer.clickCountryLinkItem();

        // Assert
        expect(browser.getUrl()).toContain(expectedUrl);
    });
});


