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

    it('Should not show courier links on en-GB locale if courier links is set to false', () => {
        // Assert
        expect(footer.areCourierLinksDisplayed()).toBe(false);
    });

    it('Should display country selector when set to true', () => {
        // Assert
        expect(footer.isCountrySelectorDisplayed()).toBe(true);
    });

    it('Should not show courier links on en-GB locale if courier links is set to true', () => {
        // Arrange
        const footerData = {
            locale: 'gb',
            courierLinks: true
        };
        // Act
        footer.open(footerData);

        // Assert
        expect(footer.areCourierLinksDisplayed()).toBe(false);
    });

    it('Should not show country selector on en-GB locale if unselected', () => {
        // Arrange
        const footerData = {
            locale: 'gb',
            courierLinks: true,
            countrySelector: false
        };
        // Act
        footer.open(footerData);

        // Assert
        expect(footer.isCountrySelectorDisplayed()).toBe(false);
    });

    forEach([['au', 'au'], ['at', 'at'], ['be', 'be-en'], ['bg', 'bg'], ['ca_en', 'skipthedishes.com'], ['ca_fr', 'skipthedishes.com/fr'], ['dk', '.dk'], ['jet_fr', '.fr'], ['de', '.de'], ['ie', '.ie'], ['il', '.il'], ['it', '.it'], 
    ['lu', 'lu-en'], ['nl', '.nl'], ['nz', '.nz'], ['no', '.no'], ['pl', '.pl'], ['pt', '/pt'], ['ro', '/ro'], ['es', '.es'], ['ch_ch', '.ch'], ['ch_en', '/en'], ['ch_fr', '/fr'] ])
    .it.skip('should display all countries and redirect to correct URL', (country, expectedUrl) => {
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
