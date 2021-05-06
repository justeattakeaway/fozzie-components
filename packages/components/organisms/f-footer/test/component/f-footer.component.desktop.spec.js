import forEach from 'mocha-each';

const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');

const Footer = require('../../../test-utils/component-objects/f-footer.component');

let footer;


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

describe('Desktop - f-footer component tests - @browserstack', () => {
    beforeEach(() => {
        footer = new Footer('organism', 'footer-component');
        footer.withQuery('&knob-Locale', formatLocale('gb'));
        footer.withQuery('&knob-Show country selector', 'true');
        footer.withQuery('&knob-Show courier links', 'false');
        const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);

        footer.open(pageUrl);
        footer.waitForComponent();
    });

    forEach([['ios', 'apple'], ['android', 'google'], ['huawei', 'appgallery']])
    .it('should display download icon "%s" and redirect to correct URL ("%s")', (icon, expectedUrl) => {
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
    .it('should display social media icon "%s" and redirect to correct URL ("%s")', (icon, expectedUrl) => {
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
        footer.withQuery('&knob-Locale', formatLocale(expectedLocale));
        footer.withQuery('&knob-Show country selector', 'false');
        footer.withQuery('&knob-Show courier links', 'false');
        const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);

        // Act
        footer.open(pageUrl);
        footer.waitForComponent();

        // Assert
        expect(footer.areCourierLinksDisplayed()).toBe(false);
        expect(footer.isCountrySelectorDisplayed()).toBe(false);
    });

    forEach(['au', 'ie', 'nz'])
    .it('should show courier links for country code "%s" when option is selected', expectedLocale => {
        // Arrange
        footer.withQuery('&knob-Locale', formatLocale(expectedLocale));
        footer.withQuery('&knob-Show country selector', 'false');
        footer.withQuery('&knob-Show courier links', 'true');
        const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);

        // Act
        footer.open(pageUrl);
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
        footer.withQuery('&knob-Locale', formatLocale(expectedLocale));
        footer.withQuery('&knob-Show country selector', 'true');
        footer.withQuery('&knob-Show courier links', 'false');
        const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);

        // Act
        footer.open(pageUrl);
        footer.waitForComponent();

        // Assert
        expect(footer.isCountrySelectorDisplayed()).toBe(true);
    });

    forEach(['au', 'gb', 'nz', 'ie', 'dk', 'es', 'it'])
    .it('should display the corresponding icon for the "%s" country code', expectedLocale => {
        // Arrange
        footer.withQuery('&knob-Locale', formatLocale(expectedLocale));
        footer.withQuery('&knob-Show country selector', 'true');
        footer.withQuery('&knob-Show courier links', 'false');
        const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);

        // Act
        footer.open(pageUrl);
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
    ]).it('should display link for country code "%s" and redirect to correct URL ("%s")', (country, expectedUrl) => {
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
    .it('should display link for country code "%s" and redirect to correct URL ("%s")', (country, expectedUrl) => {
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
    .it('should display social icons block for country code "%s"', expectedLocale => {
        // Arrange
        footer.withQuery('&knob-Locale', formatLocale(expectedLocale));
        footer.withQuery('&knob-Show country selector', 'false');
        footer.withQuery('&knob-Show courier links', 'false');
        const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);

        // Act
        footer.open(pageUrl);
        footer.waitForComponent();

        // Assert
        expect(footer.isSocialIconBlockDisplayed()).toBe(true);
    });

    forEach(['gb', 'au', 'ie', 'nz', 'dk', 'es', 'it', 'no'])
    .it('should display app downloads block for country code "%s"', expectedLocale => {
        // Arrange
        footer.withQuery('&knob-Locale', formatLocale(expectedLocale));
        footer.withQuery('&knob-Show country selector', 'false');
        footer.withQuery('&knob-Show courier links', 'false');
        const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);

        // Act
        footer.open(pageUrl);
        footer.waitForComponent();

        // Assert
        expect(footer.isDownloadIconBlockDisplayed()).toBe(true);
    });

    forEach(['gb', 'au', 'ie', 'nz', 'dk', 'es', 'it', 'no'])
    .it('should display payment options block for country code "%s"', expectedLocale => {
        // Arrange
        footer.withQuery('&knob-Locale', formatLocale(expectedLocale));
        footer.withQuery('&knob-Show country selector', 'false');
        footer.withQuery('&knob-Show courier links', 'false');
        const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);

        // Act
        footer.open(pageUrl);
        footer.waitForComponent();

        // Assert
        expect(footer.isPaymentIconsBlockDisplayed()).toBe(true);
    });

    forEach(['gb', 'au', 'ie', 'nz', 'dk', 'es', 'it', 'no'])
    .it('should display the feedback block for country code "%s"', expectedLocale => {
        // Arrange
        footer.withQuery('&knob-Locale', formatLocale(expectedLocale));
        footer.withQuery('&knob-Show country selector', 'false');
        footer.withQuery('&knob-Show courier links', 'false');
        const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);

        // Act
        footer.open(pageUrl);
        footer.waitForComponent();

        // Assert
        expect(footer.isFeedbackBlockDisplayed()).toBe(true);
    });

    it('should check to see if the feedback button is clickable', () => {
        // Assert
        expect(footer.isFeedbackButtonClickable()).toBe(true);
    });
});
