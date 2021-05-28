import forEach from 'mocha-each';

const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');

const Header = require('../../test-utils/component-objects/f-header.component');

let header;

describe('Desktop - f-header component tests - @browserstack', () => {
    beforeEach(() => {
        // Arrange
        header = new Header('organism', 'header-component');
        header.withQuery('&knob-Show offers link', 'true');
        header.withQuery('&knob-Show delivery enquiry', 'true');
        const pageUrl = buildUrl(header.componentType, header.componentName, header.path);

        // Act
        header.open(pageUrl);
        header.waitForComponent();
        browser.maximizeWindow();
    });

    forEach(['offersLink', 'delivery', 'help', 'countrySelector', 'userAccount'])
    .it('should display all navigation links - @percy', link => {
        // Assert
        expect(header.isNavigationLinkDisplayed(link)).toBe(true);
    });

    // Make sure tenant is appended to screenshot for Percy tests
    forEach(['en-AU', 'en-IE', 'en-NZ'])
    .it('should display the below navigation links for country code "%s" - @percy', tenant => {
        // Arrange
        header.withQuery('&knob-Locale', tenant);

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

    forEach(['it-IT', 'es-ES', 'da-DK', 'nb-NO'])
    .it('should display the below navigation links', tenant => {
        // Arrange
        header.withQuery('&knob-Locale', tenant);
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

    // Make sure tenant is appended to screenshot for Percy tests
    forEach(['it-IT', 'es-ES', 'da-DK', 'nb-NO'])
    .it('should display the below navigation links for country code "%s" - @percy', tenant => {
        // Arrange
        header.withQuery('&knob-Locale', tenant);
        header.withQuery('&knob-Show offers link', 'true');
        header.withQuery('&knob-Show delivery enquiry', 'true');
        const pageUrl = buildUrl(header.componentType, header.componentName, header.path);

        ['userAccount', 'help', 'countrySelector'].forEach(link => {
            // Act
            header.open(pageUrl);
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
    .it('should display link for country code "%s" and redirect to correct URL ("%s")', (expectedLocale, expectedUrl) => {
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
    .it('should display link for country code "%s" and redirect to correct URL ("%s")', (expectedLocale, expectedUrl) => {
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

    // Make sure tenant is appended to screenshot for Percy tests
    forEach(['en-AU', 'en-GB', 'en-NZ', 'en-IE', 'da-DK', 'es-ES', 'it-IT'])
    .describe('for country code "%s" - @percy', tenant => {
        it('should display correct selector icon - @percy', () => {
            // Arrange
            header.withQuery('&knob-Locale', tenant);
            const pageUrl = buildUrl(header.componentType, header.componentName, header.path);
            const countryIcon = tenant.split('-');

            // Act
            header.open(pageUrl);
            header.waitForComponent();

            // Assert
            expect(header.isCurrentCountryIconDisplayed(countryIcon[1].toLowerCase())).toBe(true);
        });
    });
});
