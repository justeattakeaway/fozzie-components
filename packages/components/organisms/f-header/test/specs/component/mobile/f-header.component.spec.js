const forEach = require('mocha-each');
const Header = require('../../../../test-utils/component-objects/f-header.component');

const header = new Header();

describe('Mobile - f-header component tests', () => {
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
    .it('should display all navigation links', link => {
        // Act
        header.openMobileNavigation();

        // Assert
        expect(header.isNavigationLinkDisplayed(link)).toBe(true);
    });

    forEach(['au', 'ie', 'nz'])
    .it('should hide all navigation links but display offersIcon link, when in mobile mode', expectedLocale => {
        // Arrange
        const headerData = {
            locale: expectedLocale,
            offers: true,
            delivery: true
        };

        ['offersLink', 'delivery', 'userAccount', 'help', 'countrySelector'].forEach(link => {
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
    .it('should hide all navigation links, as well as offersIcon, when in mobile mode', expectedLocale => {
        // Arrange
        const headerData = {
            locale: expectedLocale,
            offers: true,
            delivery: true
        };

        ['offersLink', 'delivery', 'userAccount', 'help', 'countrySelector'].forEach(link => {
            // Act
            header.open(headerData);
            header.waitForComponent();

            // Assert
            expect(header.isMobileNavigationBarDisplayed()).toBe(true);
            expect(header.isNavigationLinkDisplayed(link)).toBe(false);
        });
    });

    forEach(['au', 'ie', 'nz'])
    .it('should display navigation links when burger menu is opened', expectedLocale => {
        // Arrange
        const headerData = {
            locale: expectedLocale,
            offers: true,
            delivery: true
        };

        ['offersLink', 'userAccount', 'help', 'countrySelector'].forEach(link => {
            // Act
            header.open(headerData);
            header.openMobileNavigation();
            header.waitForComponent();

            // Assert
            expect(header.isNavigationLinkDisplayed(link)).toBe(true);
        });
    });

    forEach(['it', 'es', 'dk', 'no'])
    .it('should display the below navigation links when menu has been opened', expectedLocale => {
        // Arrange
        const headerData = {
            locale: expectedLocale,
            offers: true,
            delivery: true
        };

        ['userAccount', 'help', 'countrySelector'].forEach(link => {
            // Act
            header.open(headerData);
            header.openMobileNavigation();
            header.waitForComponent();

            // Assert
            expect(header.isNavigationLinkDisplayed(link)).toBe(true);
            expect(header.isNavigationLinkDisplayed('offersLink')).toBe(false);
            expect(header.isNavigationLinkDisplayed('delivery')).toBe(false);
        });
    });

    forEach(['au', 'gb', 'nz', 'ie', 'dk', 'es', 'it'])
    .it('should display all countries when in mobile mode', country => {
        // Act
        header.openMobileNavigation();
        header.openCountrySelector();
        header.expectedCountry = country;

        // Assert
        expect(header.isCountryLinkDisplayed()).toBe(true);
    });
});
