const forEach = require('mocha-each');
const Footer = require('../../../test-utils/component-objects/f-footer.component');

const footer = new Footer();

describe('Desktop - f-footer component tests - @browserstack', () => {
    beforeEach(() => {
        const footerData = {
            locale: 'gb',
            courierLinks: false,
            countrySelector: true
        };

        footer.open(footerData);
        footer.waitForComponent();
    });

    forEach([['ios', 'apple'], ['android', 'google'], ['huawei', 'appgallery']])
    .it('should display download icons and link to correct URL', (icon, expectedUrl) => {
        // Act
        footer.expectedDownloadIcon = icon;

        // Assert
        expect(footer.isDownloadIconDisplayed()).toBe(true);

        // Act
        footer.clickDownloadIcon();

        // Assert
        expect(browser.getUrl()).toContain(expectedUrl);
    });

    forEach([['twitter', 'twitter.com'], ['facebook', 'facebook.com'], ['youtube', 'youtube.com']])
    .it('should display social media icons', (icon, expectedUrl) => {
        // Act
        footer.expectedSocialIcon = icon;

        // Assert
        expect(footer.isSocialIconDisplayed()).toBe(true);

        // Act
        footer.clickSocialIcon();

        // Assert
        expect(browser.getUrl()).toContain(expectedUrl);
    });

    it('should display the footer', () => {
        // Assert
        expect(footer.isComponentDisplayed()).toBe(true);
    });

    forEach(['au', 'nz', 'ie', 'dk', 'es', 'it', 'no'])
    .it('should not show courier links and country selector when options are unselected', tenant => {
        // Arrange
        const footerData = {
            locale: expectedLocale, // fix this
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

    forEach(['au', 'nz', 'ie'])
    .it('should show courier links when option is selected', () => {
        // Arrange
        const footerData = {
            locale: expectedLocale, // fix this
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
    .it('should never show courier links, even when option is selected', () => {
        // Arrange
        const footerData = {
            locale: expectedLocale, // fix this
            courierLinks: true,
            countrySelector: false
        };

        // Act
        footer.open(footerData);
        footer.waitForComponent();

        // Assert
        expect(footer.areCourierLinksDisplayed()).toBe(false);
    });

    forEach(['gb', 'au', 'ie', 'nz', 'dk', 'es', 'it', 'no'])
    .it('should always show country selector when selected', () => {
        // Arrange
        const footerData = {
            locale: expectedLocale, // fix this
            courierLinks: false,
            countrySelector: true
        };

        // Act
        footer.open(footerData);
        footer.waitForComponent();

        // Assert
        expect(footer.isCountrySelectorDisplayed()).toBe(true);
    });

    forEach(['gb', 'au', 'ie', 'nz', 'dk', 'es', 'it', 'no'])
    .it('should display the corresponding icon for each locale selected', () => {
        // Arrange
        const footerData = {
            locale: expectedLocale, // fix this
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
