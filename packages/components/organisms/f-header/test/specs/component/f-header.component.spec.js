const forEach = require('mocha-each');
const Header = require('../../../test-utils/component-objects/f-header.component');
const { buildUrl } = require('../../../../../../services/f-wdio-utils/src/storybook-extensions.js');

const header = new Header('organism', 'header-component');

const formatCountryCode = locale => {
    const countryFormatted = locale.toUpperCase();
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
};

describe('f-header component tests', () => {
    beforeEach(() => {
        const pageUrl = buildUrl(header.componentType, header.componentName, header.path);

        header.open(pageUrl)
            .waitForComponent();
    });

    it('should display component', () => {
        // Assert
        expect(header.isComponentDisplayed()).toBe(true);
    });

    it('should display logo', () => {
        // Assert
        expect(header.isLogoDisplayed()).toBe(true);
    });

    forEach(['help', 'countrySelector', 'userAccount'])
    .it('should only display the default navigation fields', field => {
        // Assert
        expect(header.isFieldLinkDisplayed(field)).toBe(true);
        expect(header.isFieldLinkDisplayed('offers')).toBe(false);
    });

    forEach(['offers', 'help', 'delivery', 'userAccount', 'countrySelector'])
    .it('should display extra fields as well as default when selected', field => {
        // Arrange
        header.withQuery('knob-Show offers link', 'true')
        .withQuery('knob-Show delivery enquiry', 'true');
        const pageUrl = buildUrl(header.componentType, header.componentName, header.path);

        // Act
        header.open(pageUrl);

        // Assert
        expect(header.isFieldLinkDisplayed(field)).toBe(true);
    });

    forEach(['help', 'delivery', 'userAccount', 'countrySelector'])
    .it('should hide all navigation links, except offers link, when in mobile mode', field => {
        // Arrange
        header.withQuery('knob-Show offers link', 'true')
                .withQuery('knob-Show delivery enquiry', 'true');
        const pageUrl = buildUrl(header.componentType, header.componentName, header.path);

        // Act
        browser.setWindowSize(500, 1000);
        header.open(pageUrl);

        // Assert
        expect(header.isMobileNavigationBarDisplayed()).toBe(true);
        expect(header.isFieldLinkDisplayed(field)).toBe(false);
        expect(header.isFieldLinkDisplayed('offers')).toBe(true);
    });

    forEach(['help', 'countrySelector', 'userAccount'])
    .it('should display navigation fields when burger menu has been opened', field => {
        // Act
        browser.setWindowSize(500, 1000);
        header.openMobileNavigationBar();

        // Assert
        expect(header.isFieldLinkDisplayed(field)).toBe(true);
    });

    it('should change the url to "help" when help-link is clicked', () => {
        // Act
        browser.setWindowSize(1000, 1000);
        header.clickHelpLink();

        // Assert
        expect(browser.getUrl()).toContain('/help');
    });

    it('should change the url to "offers" when offers link is clicked', () => {
        // Arrange
        header.withQuery('knob-Show offers link', 'true')
                .withQuery('knob-Show delivery enquiry', 'true');
        const pageUrl = buildUrl(header.componentType, header.componentName, header.path);

        // Act
        header.open(pageUrl);
        header.clickOffersLink();

        // Assert
        expect(browser.getUrl()).toContain('/offers');
    });

    forEach([['gb', '.co.uk'], ['au', 'au'], ['at', 'at'], ['be', 'be-en'], ['bg', 'bg'], ['ca_en', 'skipthedishes.com'], ['ca_fr', 'skipthedishes.com/fr'], ['dk', '.dk'], ['jet_fr', '.fr'], ['de', '.de'], ['ie', '.ie'], ['il', '.il'], ['it', '.it'],
        ['lu', 'lu-en'], ['nl', '.nl'], ['nz', '.nz'], ['no', '.no'], ['pl', '.pl'], ['pt', '/pt'], ['ro', '/ro'], ['es', '.es'], ['ch_ch', '.ch'], ['ch_en', '/en'], ['ch_fr', '/fr']])
    .it('should display all countries and redirect to correct URL', (country, expectedUrl) => {
        // Act
        browser.maximizeWindow();
        header.moveToCountrySelector();
        header.expectedCountry = country;

        // Assert
        expect(header.isCountryLinkDisplayed()).toBe(true);

        // Act
        header.clickCountryListItem();

        // Assert
        expect(browser.getUrl()).toContain(expectedUrl);
    });

    forEach(['au', 'gb', 'nz', 'ie', 'dk', 'es', 'it'])
    .it('should display all countries when in mobile mode', country => {
        // Act
        browser.setWindowSize(500, 1000);
        header.openMobileNavigationBar();
        header.openCountrySelector();
        header.expectedCountry = country;

        // Assert
        expect(header.isCountryLinkDisplayed()).toBe(true);
    });

    forEach(['au', 'gb', 'nz', 'ie', 'dk', 'es', 'it'])
    .it('should display correct country selector icon depending on which locale is chosen', country => {
        // Arrange
        header.withQuery('knob-Locale', formatCountryCode(country));
        const pageUrl = buildUrl(header.componentType, header.componentName, header.path);


        // Act
        browser.maximizeWindow();
        header.openWithLocale(country);

        // Assert
        expect(header.isCurrentCountryIconDisplayed(country)).toBe(true);
    });
});
