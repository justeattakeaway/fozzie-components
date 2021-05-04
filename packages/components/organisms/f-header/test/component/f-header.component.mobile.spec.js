import forEach from 'mocha-each';

const Header = require('../../test-utils/component-objects/f-header.component');

const header = new Header();

describe('Mobile - f-header component tests - @browserstack', () => {
    beforeEach(() => {
        const headerData = {
            locale: 'gb',
            offers: true,
            delivery: true
        };

        header.open(headerData);
        header.waitForComponent();

        if (process.env.JE_ENV !== 'browserstack') {
            browser.setWindowSize(500, 1000);
        }
    });

    forEach(['offersLink', 'delivery', 'help', 'countrySelector', 'userAccount'])
    .it.only('should display the navigation link: "%s"', link => {
        // Act
        header.openMobileNavigation();

        // Assert
        expect(header.isNavigationLinkDisplayed(link)).toBe(true);
    });

    forEach(['au', 'ie', 'nz'])
    .describe('when in mobile mode for country code "%s"', expectedLocale => {
        // Arrange
        const headerData = {
            locale: expectedLocale,
            offers: true,
            delivery: true
        };

        forEach(['offersLink', 'delivery', 'userAccount', 'help', 'countrySelector'])
        .it('should hide "%s" navigation link but display offersIcon link', link => {
            // Act
            header.open(headerData);
            header.waitForComponent();

            // Assert
            expect(header.isMobileNavigationBarDisplayed()).toBe(true);
            expect(header.isNavigationLinkDisplayed(link)).toBe(false);
            expect(header.isNavigationLinkDisplayed('offersIcon')).toBe(true);
        });
    });

    forEach(['it', 'es', 'dk', 'no'])
    .describe('country code "%s" when in mobile mode', expectedLocale => {
        // Arrange
        const headerData = {
            locale: expectedLocale,
            offers: true,
            delivery: true
        };

        forEach(['offersLink', 'delivery', 'userAccount', 'help', 'countrySelector'])
        .it('should hide all navigation links, including the offersIcon,', link => {
            // Act
            header.open(headerData);
            header.waitForComponent();

            // Assert
            expect(header.isMobileNavigationBarDisplayed()).toBe(true);
            expect(header.isNavigationLinkDisplayed(link)).toBe(false);
        });
    });

    forEach(['au', 'ie', 'nz'])
    .describe('for country code "%s" when in mobile mode', expectedLocale => {
        // Arrange
        const headerData = {
            locale: expectedLocale,
            offers: true,
            delivery: true
        };

        forEach(['offersLink', 'userAccount', 'help', 'countrySelector'])
        .it('should display "%s" navigation link when burger menu is opened', link => {
            // Act
            header.open(headerData);
            header.openMobileNavigation();
            header.waitForComponent();

            // Assert
            expect(header.isNavigationLinkDisplayed(link)).toBe(true);
        });
    });

    forEach(['it', 'es', 'dk', 'no'])
    .describe('for country code "%s" in mobile mode', expectedLocale => {
        // Arrange
        const headerData = {
            locale: expectedLocale,
            offers: true,
            delivery: true
        };

        forEach(['userAccount', 'help', 'countrySelector'])
        .it('should display the "%s" navigation link when burger menu is opened', link => {
            // Act
            header.open(headerData);
            header.openMobileNavigation();
            header.waitForComponent();

            // Assert
            expect(header.isNavigationLinkDisplayed(link)).toBe(true);
        });

        expect(header.isNavigationLinkDisplayed('offersLink')).toBe(false);
        expect(header.isNavigationLinkDisplayed('delivery')).toBe(false);
    });

    forEach(['au', 'gb', 'nz', 'ie', 'dk', 'es', 'it'])
    .it('should display all countries when in mobile mode for country code "%s"', country => {
        // Act
        header.openMobileNavigation();
        header.openCountrySelector();
        header.expectedCountry = country;

        // Assert
        expect(header.isCountryLinkDisplayed()).toBe(true);
    });
});
