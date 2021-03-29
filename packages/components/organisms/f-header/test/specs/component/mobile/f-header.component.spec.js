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

    forEach(['offersLink', 'delivery', 'userAccount', 'help', 'countrySelector'])
    .it('should hide all navigation links, except offersIcon link, when in mobile mode', field => {
        // Arrange
        const locales = ['gb', 'au', 'ie', 'nz'];

        for (let i = 0; i < locales.length; i++) {
            // Arrange
            const headerData = {
                locale: locales[i],
                offers: true,
                delivery: true
            };

            // Act
            header.open(headerData);

            // Assert
            expect(header.isMobileNavigationBarDisplayed()).toBe(true);
            expect(header.isFieldLinkDisplayed(field)).toBe(false);
            expect(header.isFieldLinkDisplayed('offersIcon')).toBe(true);
        }
    });

    forEach(['offersLink', 'delivery', 'userAccount', 'help', 'countrySelector'])
    .it.only('should display navigation fields when burger menu has been opened', field => {
        // Arrange
        const locales = ['gb', 'au', 'ie', 'nz'];
        const headerData = {
            locale: '',
            offers: true,
            delivery: true
        };

        for (let i = 0; i < locales.length; i++) {
            headerData.locale = locales[i];

            // Act
            header.open(headerData);
            header.openMobileNavigation();
        }

        // Assert
        expect(header.isFieldLinkDisplayed(field)).toBe(true);
    });

    forEach(['userAccount', 'help', 'countrySelector'])
    .it('should not display offers link and delivery fields for the below locales', field => {
        // Arrange
        const locales = ['it', 'es', 'dk', 'no'];

        for (let i = 0; i < locales.length; i++) {
            // Arrange
            const headerData = {
                locale: locales[i],
                offers: true,
                delivery: true
            };

            // Act
            header.open(headerData);
            header.openMobileNavigation();

            // Assert
            expect(header.isFieldLinkDisplayed(field)).toBe(true);
            expect(header.isFieldLinkDisplayed('offersLink')).toBe(false);
            expect(header.isFieldLinkDisplayed('delivery')).toBe(false);
        }
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
