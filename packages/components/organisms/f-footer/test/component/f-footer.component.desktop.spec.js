import forEach from 'mocha-each';

const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');

const Footer = require('../../test-utils/component-objects/f-footer.component');

let footer;

describe('Desktop - f-footer component tests - @browserstack', () => {
    beforeEach(() => {
        footer = new Footer('organism', 'footer-component');
        footer.withQuery('&knob-Locale', 'en-GB');
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

    it('should display the footer - @percy', () => {
        // Assert
        expect(footer.isComponentDisplayed()).toBe(true);
    });

    // Make sure tenant is appended to screenshot for Percy tests
    forEach(['en-GB', 'en-AU', 'en-IE', 'en-NZ', 'da-DK', 'es-ES', 'it-IT', 'nb-NO'])
        .it('should not show courier links and country selector for country code "%s" when options are unselected - @percy', tenant => {
            // Arrange
            footer.withQuery('&knob-Locale', tenant);
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

    // Make sure tenant is appended to screenshot for Percy tests
    forEach(['en-AU', 'en-IE', 'en-NZ'])
        .it('should show courier links for country code "%s" when option is selected - @percy', tenant => {
            // Arrange
            footer = new Footer('organism', 'footer-component');
            footer.withQuery('&knob-Locale', tenant);
            footer.withQuery('&knob-Show country selector', 'false');
            footer.withQuery('&knob-Show courier links', 'true');
            const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);

            // Act
            footer.open(pageUrl);
            footer.waitForComponent();

            // Assert
            expect(footer.areCourierLinksDisplayed()).toBe(true);
        });

    // Make sure tenant is appended to screenshot for Percy tests
    forEach(['en-GB', 'es-ES', 'it-IT', 'nb-NO'])
        .it('should never show courier links for country code "%s", even when option is selected - @percy', tenant => {
            // Arrange
            footer = new Footer('organism', 'footer-component');
            footer.withQuery('&knob-Locale', tenant);
            footer.withQuery('&knob-Show country selector', 'false');
            footer.withQuery('&knob-Show courier links', 'true');
            const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);

            // Act
            footer.open(pageUrl);
            footer.waitForComponent();

            // Assert
            expect(footer.areCourierLinksDisplayed()).toBe(false);
        });

    // Make sure tenant is appended to screenshot for Percy tests
    forEach(['en-AU', 'en-IE', 'en-NZ', 'da-DK', 'es-ES', 'it-IT', 'nb-NO'])
        .it('should always show country selector for country code "%s" when selected - @percy', tenant => {
            // Arrange
            footer = new Footer('organism', 'footer-component');
            footer.withQuery('&knob-Locale', tenant);
            footer.withQuery('&knob-Show country selector', 'true');
            footer.withQuery('&knob-Show courier links', 'false');
            const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);

            // Act
            footer.open(pageUrl);
            footer.waitForComponent();

            // Assert
            expect(footer.isCountrySelectorDisplayed()).toBe(true);
        });

    // Make sure tenant is appended to screenshot for Percy tests
    forEach(['en-AU', 'en-GB', 'en-NZ', 'en-IE', 'da-DK', 'es-ES', 'it-IT'])
        .it('should display the corresponding icon for the "%s" country code - @percy', tenant => {
            // Arrange
            footer = new Footer('organism', 'footer-component');
            footer.withQuery('&knob-Locale', tenant);
            footer.withQuery('&knob-Show country selector', 'true');
            footer.withQuery('&knob-Show courier links', 'false');
            const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);
            const countryIcon = tenant.split('-');

            // Act
            footer.open(pageUrl);
            footer.waitForComponent();

            // Assert
            expect(footer.isCurrentCountryIconDisplayed(countryIcon[1].toLowerCase())).toBe(true);
        });

    forEach([
        ['au', 'menulog.com.au'],
        ['at', 'lieferando.at'],
        ['be', 'takeaway.com/be'],
        ['bg', 'takeaway.com/bg'],
        ['ca_en', 'skipthedishes.com'],
        ['dk', 'just-eat.dk'],
        ['jet_fr', 'just-eat.fr'],
        ['de', 'lieferando.de'],
        ['ie', 'just-eat.ie'],
        ['il', '10bis.co.il'],
        ['it', 'justeat.it'],
        ['lu', 'takeaway.com/lu'],
        ['nl', 'thuisbezorgd.nl'],
        ['nz', 'menulog.co.nz'],
        ['no', 'just-eat.no'],
        ['pl', 'pyszne.pl'],
        ['pt', 'takeaway.com/pt'],
        ['ro', 'takeaway.com/ro'],
        ['es', 'just-eat.es'],
        ['ch_ch', 'eat.ch'],
        ['ch_en', 'eat.ch/en'],
        ['ch_fr', 'eat.ch/fr']
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

    // Make sure tenant is appended to screenshot for Percy tests
    forEach(['en-GB', 'en-AU', 'en-IE', 'en-NZ', 'da-DK', 'es-ES', 'it-IT', 'nb-NO'])
        .it('should display social icons block for country code "%s" - @percy', tenant => {
            // Arrange
            footer = new Footer('organism', 'footer-component');
            footer.withQuery('&knob-Locale', tenant);
            footer.withQuery('&knob-Show country selector', 'false');
            footer.withQuery('&knob-Show courier links', 'false');
            const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);

            // Act
            footer.open(pageUrl);
            footer.waitForComponent();

            // Assert
            expect(footer.isSocialIconBlockDisplayed()).toBe(true);
        });

    // Make sure tenant is appended to screenshot for Percy tests
    forEach(['en-GB', 'en-AU', 'en-IE', 'en-NZ', 'da-DK', 'es-ES', 'it-IT', 'nb-NO'])
        .it('should display app downloads block for country code "%s" - @percy', tenant => {
            // Arrange
            footer = new Footer('organism', 'footer-component');
            footer.withQuery('&knob-Locale', tenant);
            footer.withQuery('&knob-Show country selector', 'false');
            footer.withQuery('&knob-Show courier links', 'false');
            const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);

            // Act
            footer.open(pageUrl);
            footer.waitForComponent();

            // Assert
            expect(footer.isDownloadIconBlockDisplayed()).toBe(true);
        });

    // Make sure tenant is appended to screenshot for Percy tests
    forEach(['en-GB', 'en-AU', 'en-IE', 'en-NZ', 'da-DK', 'es-ES', 'it-IT', 'nb-NO'])
        .it('should display payment options block for country code "%s" - @percy', tenant => {
            // Arrange
            footer = new Footer('organism', 'footer-component');
            footer.withQuery('&knob-Locale', tenant);
            footer.withQuery('&knob-Show country selector', 'false');
            footer.withQuery('&knob-Show courier links', 'false');
            const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);

            // Act
            footer.open(pageUrl);
            footer.waitForComponent();

            // Assert
            expect(footer.isPaymentIconsBlockDisplayed()).toBe(true);
        });

    // Make sure tenant is appended to screenshot for Percy tests
    forEach(['en-GB', 'en-AU', 'en-IE', 'en-NZ', 'da-DK', 'es-ES', 'it-IT', 'nb-NO'])
        .it('should display the feedback block for country code "%s" - @percy', tenant => {
            // Arrange
            footer = new Footer('organism', 'footer-component');
            footer.withQuery('&knob-Locale', tenant);
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
