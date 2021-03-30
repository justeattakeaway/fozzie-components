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

    // forEach(['offersLink', 'delivery', 'userAccount', 'help', 'countrySelector'])
    // .it('should hide all navigation links, except offersIcon link, when in mobile mode', field => {
    //     // Arrange
    //     const locales = ['gb', 'au', 'ie', 'nz'];

    //     for (let i = 0; i < locales.length; i++) {
    //         // Arrange
    //         const headerData = {
    //             locale: locales[i],
    //             offers: true,
    //             delivery: true
    //         };

    //         // Act
    //         header.open(headerData);
    //         console.log(headerData);
    //     }

    //     // Assert
    //     expect(header.isMobileNavigationBarDisplayed()).toBe(true);
    //     expect(header.isFieldLinkDisplayed(field)).toBe(false);
    //     expect(header.isFieldLinkDisplayed('offersIcon')).toBe(true);
    // });

    // forEach(['offersLink', 'delivery', 'userAccount', 'help', 'countrySelector'])
    // .it('should display navigation fields when burger menu has been opened', field => {
    //     // Arrange
    //     const locales = ['gb', 'au', 'ie', 'nz'];

    //     for (let i = 0; i < locales.length; i++) {
    //         // Arrange
    //         const headerData = {
    //             locale: locales[i],
    //             offers: true,
    //             delivery: true
    //         };

    //         // Act
    //         header.open(headerData);
    //         console.log('heyyy', headerData);
    //         header.openMobileNavigation();
    //     }

    //     // Assert
    //     expect(header.isFieldLinkDisplayed(field)).toBe(true);
    // });

    forEach(['gb', 'au', 'ie', 'nz'])
    .it('should display navigation links when burger menu is opened', expectedLocale => {
        // Arrange
        const headerData = {
            locale: expectedLocale,
            offers: true,
            delivery: true
        };
        let navigationLink = '';
        ['offersLink', 'delivery', 'userAccount', 'help', 'countrySelector'].forEach(link => {
            navigationLink = link;
        });

        // Act
        header.open(headerData);
        header.openMobileNavigation();

        // Assert
        expect(header.isFieldLinkDisplayed(navigationLink)).toBe(true);
    });

    forEach(['userAccount', 'help', 'countrySelector'])
    .it('should display all navigation links, except for offers and delivery', field => {
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
        }

        // Assert
        expect(header.isFieldLinkDisplayed(field)).toBe(true);
        expect(header.isFieldLinkDisplayed('offersLink')).toBe(false);
        expect(header.isFieldLinkDisplayed('delivery')).toBe(false);
    });

    forEach(['it', 'es', 'dk', 'no'])
    .it('should display all navigation links, except for offers and delivery', expectedLocale => {
        // Arrange
        const headerData = {
            locale: expectedLocale,
            offers: true,
            delivery: true
        };
        const navigation = ['userAccount', 'help', 'countrySelector'];
        let navigationLink = '';

        // Act
        for (let i = 0; i < navigation.length; i++) {
            navigationLink = navigation[i];
            header.open(headerData);
            header.openMobileNavigation();
        }

        // Assert
        expect(header.isFieldLinkDisplayed(navigationLink)).toBe(true);
        expect(header.isFieldLinkDisplayed('offersLink')).toBe(false);
        expect(header.isFieldLinkDisplayed('delivery')).toBe(false);
    });

    // forEach(['au', 'gb', 'nz', 'ie', 'dk', 'es', 'it'])
    // .it('should display all countries when in mobile mode', country => {
    //     // Act
    //     header.openMobileNavigation();
    //     header.openCountrySelector();
    //     header.expectedCountry = country;

    //     // Assert
    //     expect(header.isCountryLinkDisplayed()).toBe(true);
    // });
});
