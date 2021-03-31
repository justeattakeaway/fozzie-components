const forEach = require('mocha-each');
const Header = require('../../../../test-utils/component-objects/f-header.component');

const header = new Header();

describe('Mobile - f-header component tests', () => {
    beforeEach(() => {
        header.open();
        header.waitForComponent();

        if (process.env.JE_ENV !== 'browserstack') {
            browser.setWindowSize(500, 1000);
        }
    });

    forEach(['help', 'delivery', 'userAccount', 'countrySelector'])
    .it('should hide all navigation links, except offersIcon link, when in mobile mode', field => {
        // Act
        header.openWithExtraFeatures();

        // Assert
        expect(header.isMobileNavigationBarDisplayed()).toBe(true);
        expect(header.isFieldLinkDisplayed(field)).toBe(false);
        expect(header.isFieldLinkDisplayed('offersIcon')).toBe(true);
    });

    forEach(['help', 'countrySelector', 'userAccount'])
    .it('should display navigation fields when burger menu has been opened', field => {
        // Act
        header.openMobileNavigation();
        header.waitForComponent();

        // Assert
        expect(header.isFieldLinkDisplayed(field)).toBe(true);
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
