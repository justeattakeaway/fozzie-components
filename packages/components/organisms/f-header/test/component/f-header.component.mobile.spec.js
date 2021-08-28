import forEach from 'mocha-each';

const Header = require('../../test-utils/component-objects/f-header.component');

let header = new Header();

describe('Mobile - f-header component tests - @browserstack', () => {
    beforeEach(() => {
        // Act
        header.load({
            'Show offers link': 'true',
            'Show delivery enquiry': 'true'
        });
        header.openMobileNavigationBar();

        if (process.env.JE_ENV !== 'browserstack') {
            browser.setWindowSize(500, 1000);
        }
    });

    // Refactor for Percy visual regression
    forEach(['offersLink', 'delivery', 'help', 'countrySelector', 'userAccount'])
        .it('should open navigation and display link "%s" - @percy', link => {
            // Assert
            expect(header.isNavigationLinkDisplayed(link)).toBe(true);
        });

    forEach(['au', 'gb', 'nz', 'ie', 'dk', 'es', 'it'])
        .it('should open country selector and display country code "%s" - @percy', country => {
            // Act
            header.openCountrySelector();
            header.expectedCountry = country;

            // Assert
            expect(header.isCountryLinkDisplayed()).toBe(true);
        });

    // Make sure tenant is appended to screenshot for Percy tests
    forEach(['en-AU', 'en-IE', 'en-NZ'])
        .describe('closed navigation for country code "%s" - @percy', tenant => {
            beforeEach(() => {
                // Act
                header.load({
                    'Locale': tenant,
                    'Show offers link': 'true',
                    'Show delivery enquiry': 'true'
                });
            });

            forEach(['offersLink', 'delivery', 'userAccount', 'help', 'countrySelector'])
                .it('should not display "%s" navigation link - @percy', link => {
                    // Assert
                    expect(header.isNavigationLinkDisplayed(link)).toBe(false);
                });

            it('should display offersIcon link - @percy', () => {
                // Assert
                expect(header.isNavigationLinkDisplayed('offersIcon')).toBe(true);
            });
        });

    forEach(['en-AU', 'en-IE', 'en-NZ'])
        .describe('open navigation for country code "%s" - @percy', tenant => {
            beforeEach(() => {
                // Act
                header.load({
                    'Locale': tenant,
                    'Show offers link': 'true',
                    'Show delivery enquiry': 'true'
                });
                header.openMobileNavigationBar();
            });

            forEach(['offersLink', 'userAccount', 'help', 'countrySelector'])
                .it('should display navigation link "%s" - @percy', link => {
                    // Assert
                    expect(header.isNavigationLinkDisplayed(link)).toBe(true);
                });

            it('should not display offersIcon link - @percy', () => {
                // Assert
                expect(header.isNavigationLinkDisplayed('offersIcon')).toBe(false);
            });
        });

    forEach(['it-IT', 'es-ES', 'da-DK', 'nb-NO'])
        .describe('closed navigation for country code "%s" - @percy', tenant => {
            beforeEach(() => {
                // Act
                header.load({
                    'Locale': tenant,
                    'Show offers link': 'true',
                    'Show delivery enquiry': 'true'
                });
            });

            forEach(['offersLink', 'delivery', 'userAccount', 'help', 'countrySelector'])
                .it('should not display navigation link "%s" - @percy', link => {
                    // Assert
                    expect(header.isNavigationLinkDisplayed(link)).toBe(false);
                });

            it('should not display the offersIcon - @percy', () => {
                expect(header.isNavigationLinkDisplayed('offersIcon')).toBe(false);
            });
        });

    // Make sure tenant is appended to screenshot for Percy tests
    forEach(['it-IT', 'es-ES', 'da-DK', 'nb-NO'])
        .describe.only('open navigation for country code "%s" - @percy', tenant => {
            beforeEach(() => {
                // Act
                header.load({
                    'Locale': tenant,
                    'Show offers link': 'true',
                    'Show delivery enquiry': 'true'
                });
                header.openMobileNavigationBar();
            });

            forEach(['userAccount', 'help', 'countrySelector'])
                .it('should display navigation link "%s" - @percy', link => {
                    // Assert
                    expect(header.isNavigationLinkDisplayed(link)).toBe(true);
                });

            it('should not display the offers link - @percy', () => {
                // Assert
                expect(header.isNavigationLinkDisplayed('offersLink')).toBe(false);
            });

            it('should not display the delivery link - @percy', () => {
                // Assert
                expect(header.isNavigationLinkDisplayed('delivery')).toBe(false);
            });

            it('should not display the offersIcon link - @percy', () => {
                // Assert
                expect(header.isNavigationLinkDisplayed('offersIcon')).toBe(false);
            });
        });
});
