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

    forEach(['offersLink', 'delivery', 'help', 'countrySelector', 'userAccount'])
    .it('should open navigation and display link "%s"', link => {
        // Assert
        expect(header.isNavigationLinkDisplayed(link)).toBe(true);
    });

    forEach(['au', 'gb', 'nz', 'ie', 'dk', 'es', 'it'])
    .it('should open country selector and display country code "%s"', country => {
        // Act
        header.openCountrySelector();
        header.expectedCountry = country;

        // Assert
        expect(header.isCountryLinkDisplayed()).toBe(true);
    });

    forEach(['au', 'ie', 'nz'])
    .describe('closed navigation for country code "%s"', expectedLocale => {

        beforeEach(() => {
            // Act
            header.open({ locale: expectedLocale, offers: true, delivery: true });
            header.waitForComponent();
        });

        forEach(['offersLink', 'delivery', 'userAccount', 'help', 'countrySelector'])
        .it('should not display "%s" navigation link', link => {
            // Assert
            expect(header.isNavigationLinkDisplayed(link)).toBe(false);
        });

        it('should display offersIcon link', () => {
            // Assert
            expect(header.isNavigationLinkDisplayed('offersIcon')).toBe(true);
        });
    });

    forEach(['au', 'ie', 'nz'])
    .describe('open navigation for country code "%s"', expectedLocale => {
        beforeEach(() => {
            // Act
            header.open({ locale: expectedLocale, offers: true, delivery: true });
            header.openMobileNavigation();
            header.waitForComponent();
        });

        forEach(['offersLink', 'userAccount', 'help', 'countrySelector'])
        .it('should display navigation link "%s"', link => {
            // Assert
            expect(header.isNavigationLinkDisplayed(link)).toBe(true);
        });

        it('should not display offersIcon link', () => {
            // Assert
            expect(header.isNavigationLinkDisplayed('offersIcon')).toBe(false);
        });
    });

    forEach(['it', 'es', 'dk', 'no'])
    .describe('closed navigation for country code "%s"', expectedLocale => {
        beforeEach(() => {
            // Act
            header.open({ locale: expectedLocale, offers: true, delivery: true });
            header.waitForComponent();
        });

        forEach(['offersLink', 'delivery', 'userAccount', 'help', 'countrySelector'])
        .it('should not display navigation link "%s",', link => {
            // Assert
            expect(header.isNavigationLinkDisplayed(link)).toBe(false);
        });

        it('should not display the offersIcon', () => {
            expect(header.isNavigationLinkDisplayed('offersIcon')).toBe(false);
        });
    });

    forEach(['it', 'es', 'dk', 'no'])
    .describe('open navigation for country code "%s"', expectedLocale => {
        beforeEach(() => {
            // Act
            header.open({ locale: expectedLocale, offers: true, delivery: true });
            header.openMobileNavigation();
            header.waitForComponent();
        });


        forEach(['userAccount', 'help', 'countrySelector'])
        .it('should display navigation link "%s"', link => {
            // Assert
            expect(header.isNavigationLinkDisplayed(link)).toBe(true);
        });

        it('should not display the offers link', () => {
            // Assert
            expect(header.isNavigationLinkDisplayed('offersLink')).toBe(false);
        });

        it('should not display the delivery link', () => {
            // Assert
            expect(header.isNavigationLinkDisplayed('delivery')).toBe(false);
        });

        it('should not display the offersIcon link', () => {
            // Assert
            expect(header.isNavigationLinkDisplayed('offersIcon')).toBe(false);
        });
    });
});
