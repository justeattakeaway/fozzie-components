const Header = require('../../../test-utils/component-objects/f-header.component');
const header = new Header();
const forEach = require('mocha-each');

describe('f-header component tests', () => {
    beforeEach(() => {
        header.open();
        header.waitForComponent();
    });

    it('mobile - desktop - should display component', () => {
        // Assert
        expect(header.isComponentDisplayed()).toBe(true);
    });

    it('desktop - should display logo', () => {
        // Assert
        expect(header.isLogoDisplayed()).toBe(true);
    })

    // forEach(['help', 'countrySelector', 'userAccount'])
    // .it('should only display the default navigation fields', field => {
    //     // Assert
    //     expect(header.isFieldLinkDisplayed(field)).toBe(true); 
    //     expect(header.isFieldLinkDisplayed('offers')).toBe(false);
    // });

    // forEach(['offers', 'help', 'delivery', 'userAccount', 'countrySelector'])
    // .it('should display extra fields as well as default when selected', field => {
    //     // Act
    //     header.openWithExtraFeatures();

    //     // Assert
    //     expect(header.isFieldLinkDisplayed(field)).toBe(true);
    // });

    // forEach(['help', 'delivery', 'userAccount', 'countrySelector'])
    // .it('should hide all navigation links, except offers link, when in mobile mode', field => {
    //     // Act
    //     browser.setWindowSize(500, 1000);
    //     header.openWithExtraFeatures();

    //     // Assert
    //     expect(header.isMobileNavigationBarDisplayed()).toBe(true);
    //     expect(header.isFieldLinkDisplayed(field)).toBe(false);
    //     expect(header.isFieldLinkDisplayed('offers')).toBe(true);
    // });

    // forEach(['help', 'countrySelector', 'userAccount'])
    // .it('should display navigation fields when burger menu has been opened', field => {
    //     // Act
    //     browser.setWindowSize(500, 1000);
    //     header.openMobileNavigation();

    //     // Assert
    //     expect(header.isFieldLinkDisplayed(field)).toBe(true);
    // });

    // it('should change the url to "help" when help-link is clicked', () => {
    //     // Act
    //     browser.setWindowSize(1000, 1000);
    //     header.clickHelpLink();

    //     // Assert
    //     expect(browser.getUrl()).toContain('/help');
    // });

    // it('should change the url to "offers" when offers link is clicked', () => {
    //     // Act
    //     header.openWithExtraFeatures();
    //     header.clickOffersLink();

    //     // Assert
    //     expect(browser.getUrl()).toContain('/offers');
    // });

    // forEach([['gb', '.co.uk'], ['au', 'au'], ['at', 'at'], ['be', 'be-en'], ['bg', 'bg'], ['ca_en', 'skipthedishes.com'], ['ca_fr', 'skipthedishes.com/fr'], ['dk', '.dk'], ['jet_fr', '.fr'], ['de', '.de'], ['ie', '.ie'], ['il', '.il'], ['it', '.it'], 
    // ['lu', 'lu-en'], ['nl', '.nl'], ['nz', '.nz'], ['no', '.no'], ['pl', '.pl'], ['pt', '/pt'], ['ro', '/ro'], ['es', '.es'], ['ch_ch', '.ch'], ['ch_en', '/en'], ['ch_fr', '/fr'] ])
    // .it('should display all countries and redirect to correct URL', (country, expectedUrl) => {
    //     // Act
    //     browser.maximizeWindow();
    //     header.moveToCountrySelector();
    //     header.expectedCountry = country;

    //     // Assert
    //     expect(header.isCountryLinkDisplayed()).toBe(true);

    //     // Act
    //     header.clickCountryListItem();

    //     // Assert
    //     expect(browser.getUrl()).toContain(expectedUrl);
    // });

    // forEach(['au', 'gb', 'nz', 'ie', 'dk', 'es', 'it'])
    // .it('should display all countries when in mobile mode', country => {
    //     // Act
    //     browser.setWindowSize(500, 1000);
    //     header.openMobileNavigation();
    //     header.openCountrySelector();
    //     header.expectedCountry = country;

    //     // Assert
    //     expect(header.isCountryLinkDisplayed()).toBe(true);
    // });

    // forEach(['au', 'gb', 'nz', 'ie', 'dk', 'es', 'it'])
    // .it('should display correct country selector icon depending on which locale is chosen', country => {
    //     // Act
    //     browser.maximizeWindow();
    //     header.openWithLocale(country);
    
    //     // Assert
    //     expect(header.isCurrentCountryIconDisplayed(country)).toBe(true);
    // });
});
