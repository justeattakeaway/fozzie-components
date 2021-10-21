import forEach from 'mocha-each';

const Header = require('../../test-utils/component-objects/f-header.component');

let header;

describe('Desktop - f-header component tests - @browserstack', () => {
    beforeEach(() => {
        // Arrange
        header = new Header();
        header.withQuery('&knob-Show offers link', 'true');
        header.withQuery('&knob-Show delivery enquiry', 'true');

        // Act
        header.load();
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

            // Act
            header.load();
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

            // Act
            header.load();
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

            ['userAccount', 'help', 'countrySelector'].forEach(link => {
                // Act
                header.load();

                // Assert
                expect(header.isNavigationLinkDisplayed(link)).toBe(true);
                expect(header.isNavigationLinkDisplayed('offersLink')).toBe(false);
                expect(header.isNavigationLinkDisplayed('delivery')).toBe(false);
            });
        });

    forEach([
        ['gb', 'just-eat.co.uk'],
        ['au', 'menulog.com.au'],
        ['at', 'lieferando.at'],
        ['be', 'takeaway.com/be'],
        ['bg', 'takeaway.com/bg'],
        ['ca_en', 'skipthedishes.com'],
        ['ca_fr', 'skipthedishes.com/fr'],
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
    ])
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
                const countryIcon = tenant.split('-');

                // Act
                header.load();

                // Assert
                expect(header.isCurrentCountryIconDisplayed(countryIcon[1].toLowerCase())).toBe(true);
            });
        });
});
