import forEach from 'mocha-each';

const Header = require('../../test-utils/component-objects/f-header.component');

const header = new Header();

describe('Mobile - f-header component tests - @browserstack', () => {
    beforeEach(() => {
        // Act
        header.open({ locale: 'gb', offers: true, delivery: true });
        header.openMobileNavigation();
        header.waitForComponent();

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
    forEach(['au', 'ie', 'nz'])
    .describe('closed navigation for country code "%s" - @percy', expectedLocale => {

        beforeEach(() => {
            // Act
            header.open({ locale: expectedLocale, offers: true, delivery: true });
            header.waitForComponent();
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

    forEach(['au', 'ie', 'nz'])
    .describe('open navigation for country code "%s" - @percy', expectedLocale => {
        beforeEach(() => {
            // Act
            header.open({ locale: expectedLocale, offers: true, delivery: true });
            header.openMobileNavigation();
            header.waitForComponent();
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

    forEach(['it', 'es', 'dk', 'no'])
    .describe('closed navigation for country code "%s" - @percy', expectedLocale => {
        beforeEach(() => {
            // Act
            header.open({ locale: expectedLocale, offers: true, delivery: true });
            header.waitForComponent();
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
    forEach(['it', 'es', 'dk', 'no'])
    .describe('open navigation for country code "%s" - @percy', expectedLocale => {
        beforeEach(() => {
            // Act
            header.open({ locale: expectedLocale, offers: true, delivery: true });
            header.openMobileNavigation();
            header.waitForComponent();
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
