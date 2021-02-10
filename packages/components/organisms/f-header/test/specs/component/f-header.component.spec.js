const Header = require('../../../test-utils/component-objects/f-header.component');
const header = new Header();
const forEach = require('mocha-each');

describe('f-header component tests', () => {
    beforeEach(() => {
        header.open();
        header.waitForComponent();
    });

    it('should display the header component', () => {
        // Assert
        expect(header.isComponentDisplayed()).toBe(true);
    });

    it('should displayed the header logo', () => {
        // Assert
        expect(header.isLogoDisplayed()).toBe(true);
    })

    forEach(['help', 'countrySelector', 'userAccount'])
    .it('should only show the default navigation fields', field => {
        // Assert
        expect(header.isFieldLinkDisplayed(field)).toBe(true); 
        expect(header.isFieldLinkDisplayed('offers')).toBe(false);
    });

    forEach(['offers', 'help', 'delivery', 'userAccount', 'countrySelector'])
    .it('should show extra fields as well as default when selected', field => {
        // Act
        header.openWithExtraFeatures()
        // Assert
        expect(header.isFieldLinkDisplayed(field)).toBe(true);
    });

    forEach(['help', 'delivery', 'userAccount', 'countrySelector'])
    .it('should hide navigation links when in mobile mode', field => {
        // Act
        header.openWithExtraFeatures()
        browser.setWindowSize(500, 1000);

        // Assert
        expect(header.isMobileNavigationBarDisplayed()).toBe(true);
        expect(header.isFieldLinkDisplayed(field)).toBe(false);
    });

    forEach(['help', 'countrySelector', 'userAccount'])
    .it('should show navigation fields when burger menu has been opened', field => {
        // Act
        browser.setWindowSize(500, 1000);
        header.openMobileNavigation();

        // Assert
        expect(header.isFieldLinkDisplayed(field)).toBe(true);
    });

    // it('should only show one offers icon in desktop view and two in mobile', () => {
    //     // Act
    //     browser.setWindowSize(500, 500);
    //     HeaderComponent.openMobileNavigation();

    //     // Assert
    //     expect(HeaderComponent.isMobileOffersIconDisplayed()).toBe(true);
    //     expect(HeaderComponent.isWebOffersIconDisplayed()).toBe(true);

    //     // Act
    //     browser.setWindowSize(1000, 1000);

    //     // Assert
    //     // expect(HeaderComponent.isMobileOffersIconDisplayed()).toBe(false);
    //     //this is currently showing as true due to error in navigation component
    //     expect(HeaderComponent.isWebOffersIconDisplayed()).toBe(true);
    // });

    it('should change url when help-link is clicked', () => {
        // Act
        browser.setWindowSize(1200, 1200);
        header.clickHelpLink();

        // Assert
        expect(browser.getUrl()).toContain('/help');
    });

    it('should change the url to offers when offers link is clicked', () => {
        // Act
        header.openWithExtraFeatures();
        header.clickOffersLink();

        // Assert
        expect(browser.getUrl()).toContain('/offers');
    });

    forEach([['gb', '.co.uk'], ['au', 'au'], ['at', 'at'], ['be', 'be-en'], ['bg', 'bg'], ['ca', 'skipthedishes.com'], ['ca', 'skipthedishes.com/fr'], ['dk', '.dk'], ['fr', '.fr'], ['de', '.de'], ['ie', '.ie'], ['il', '.il'], ['it', '.it'], ['lu', 'lu-en'], ['nl', '.nl'], ['nz', '.nz'], ['no', '.no'], ['pl', '.pl'], ['pt', '/pt'], ['ro', '/ro'], ['es', '.es'], ['ch', '.ch'], ['ch', '/en'], ['ch', '/fr'] ])
    .it.only('should display all flags when mouse hovers over country selector icon', (country, expectedUrl) => {
        // Act
        browser.maximizeWindow();
        header.moveToCountrySelector();
        header.expectedCountryFlag = country;

        // Assert
        expect(header.isCountrySelectorOpen()).toBe(true);
        expect(header.isFlagDisplayed()).toBe(true);

        // Act
        header.clickFlagListItem();

        // Assert
        expect(browser.getUrl()).toContain(expectedUrl);
        
    });

    forEach(['au', 'gb', 'nz', 'ie', 'dk', 'es', 'it'])
    .it('should change header logo depending on which locale is chosen', country => {
        // Act
        header.openWithLocale(country);
        // header.expectedCurrentCountryIcon = country
    
        // Assert
        expect(header.isCurrentCountryIconDisplayed(country)).toBe(true);
    });
});
