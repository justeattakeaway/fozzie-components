const forEach = require('mocha-each');
const Footer = require('../../../../test-utils/component-objects/f-footer.component');

const footer = new Footer();

describe('Shared - f-footer component tests', () => {
    beforeEach(() => {
        const footerData = {
            locale: 'gb',
            courierLinks: false,
            countrySelector: true
        };

        footer.open(footerData);
        footer.waitForComponent();
    });

    it('should display the footer', () => {
        // Assert
        expect(footer.isComponentDisplayed()).toBe(true);
    });

    forEach(['gb', 'au', 'ie', 'nz', 'dk', 'es', 'it', 'no'])
    .it('should not show courier links and country selector when options are unselected', expectedLocale => {
        // Arrange
        const footerData = {
            locale: expectedLocale,
            courierLinks: false,
            countrySelector: false
        };

        // Act
        footer.open(footerData);
        footer.waitForComponent();

        // Assert
        expect(footer.areCourierLinksDisplayed()).toBe(false);
        expect(footer.isCountrySelectorDisplayed()).toBe(false);
    });

    forEach(['au', 'ie', 'nz'])
    .it('should show courier links when option is selected', expectedLocale => {
        // Arrange
        const footerData = {
            locale: expectedLocale,
            courierLinks: true,
            countrySelector: false
        };

        // Act
        footer.open(footerData);
        footer.waitForComponent();

        // Assert
        expect(footer.areCourierLinksDisplayed()).toBe(true);
    });

    forEach(['gb', 'es', 'it', 'no'])
    .it('should never show courier links, even when option is selected', expectedLocale => {
        // Arrange
        const footerData = {
            locale: expectedLocale,
            courierLinks: true,
            countrySelector: false
        };

        // Act
        footer.open(footerData);
        footer.waitForComponent();

        // Assert
        expect(footer.areCourierLinksDisplayed()).toBe(false);
    });

    forEach(['au', 'ie', 'nz', 'dk', 'es', 'it', 'no'])
    .it('should always show country selector when selected', expectedLocale => {
        // Arrange
        const footerData = {
            locale: expectedLocale,
            courierLinks: false,
            countrySelector: true
        };

        // Act
        footer.open(footerData);
        footer.waitForComponent();

        // Assert
        expect(footer.isCountrySelectorDisplayed()).toBe(true);
    });

    forEach(['au', 'gb', 'nz', 'ie', 'dk', 'es', 'it'])
    .it('should display the corresponding icon for each locale selected', expectedLocale => {
        // Arrange
        const footerData = {
            locale: expectedLocale,
            courierLinks: false,
            countrySelector: true
        };

        // Act
        footer.open(footerData);
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
