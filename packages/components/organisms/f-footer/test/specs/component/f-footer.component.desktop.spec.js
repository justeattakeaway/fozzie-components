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

    forEach(['gb', 'au', 'ie', 'nz', 'dk', 'es', 'it', 'no'])
    .it('should not show courier links and country selector for country code "%s" when options are unselected', expectedLocale => {
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
    .it('should show courier links for country code "%s" when option is selected', expectedLocale => {
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
    .it('should never show courier links for country code "%s", even when option is selected', expectedLocale => {
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
    .it('should always show country selector for country code "%s" when selected', expectedLocale => {
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
    .it('should display the corresponding country code ("%s") icon for each locale selected', expectedLocale => {
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

    forEach([
        ['au', 'au'],
        ['at', 'at'],
        ['no', 'no'],
        ['dk', 'dk'],
        ['be', 'be-en'],
        ['bg', 'bg'],
        ['ca_en', 'skipthedishes.com'],
        ['jet_fr', '.fr'],
        ['de', '.de'],
        ['ie', '.ie'],
        ['il', '.il'],
        ['it', '.it']
    ]).it('should display link for country code "%s" and redirect to correct URL', (country, expectedUrl) => { 
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
    .it('should display link for country code "%s" and redirect to correct URL', (country, expectedUrl) => {
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


    forEach(['gb', 'au', 'ie', 'nz', 'dk', 'es', 'it', 'no'])
    .it('should display social icons block', expectedLocale => {
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
        expect(footer.isSocialIconBlockDisplayed()).toBe(true);
    });

    forEach(['gb', 'au', 'ie', 'nz', 'dk', 'es', 'it', 'no'])
    .it('should display app downloads block', expectedLocale => {
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
        expect(footer.isDownloadIconBlockDisplayed()).toBe(true);
    });

    forEach(['gb', 'au', 'ie', 'nz', 'dk', 'es', 'it', 'no'])
    .it('should display payment options block', expectedLocale => {
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
        expect(footer.isPaymentIconsBlockDisplayed()).toBe(true);
    });

    forEach(['gb', 'au', 'ie', 'nz', 'dk', 'es', 'it', 'no'])
    .it('should display the feedback block', expectedLocale => {
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
        expect(footer.isFeedbackBlockDisplayed()).toBe(true);
    });

    it('should check to see if the feedback button is clickable', () => {

        // Assert
        expect(footer.isFeedbackButtonClickable()).toBe(true);
    });
});
