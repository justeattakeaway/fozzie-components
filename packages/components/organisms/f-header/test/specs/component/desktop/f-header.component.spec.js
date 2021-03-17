const forEach = require('mocha-each');
const Header = require('../../../../test-utils/component-objects/f-header.component');
const header = new Header();

describe('Desktop - f-header component tests', () => {
    beforeEach(() => {
        header.open();
        header.waitForComponent();
    });

    forEach(['help', 'countrySelector', 'userAccount'])
    .it('should only display the default navigation fields', field => {
        // Assert
        expect(header.isFieldLinkDisplayed(field)).toBe(true); 
        expect(header.isFieldLinkDisplayed('offersLink')).toBe(false);
    });

    forEach(['offersLink', 'help', 'delivery', 'userAccount', 'countrySelector'])
    .it('should display extra fields as well as default when selected', field => {
        // Act
        header.openWithExtraFeatures();

        // Assert
        expect(header.isFieldLinkDisplayed(field)).toBe(true);
    });

    forEach([['gb', '.co.uk'], ['au', 'au'], ['at', 'at'], ['be', 'be-en'], ['bg', 'bg'], ['ca_en', 'skipthedishes.com'], ['ca_fr', 'skipthedishes.com/fr'], ['dk', '.dk'], ['jet_fr', '.fr'], ['de', '.de'], ['ie', '.ie'], ['il', '.il'], ['it', '.it'], 
    ['lu', 'lu-en'], ['nl', '.nl'], ['nz', '.nz'], ['no', '.no'], ['pl', '.pl'], ['pt', '/pt'], ['ro', '/ro'], ['es', '.es'], ['ch_ch', '.ch'], ['ch_en', '/en'], ['ch_fr', '/fr'] ])
    .it.skip('should display all countries and redirect to correct URL', (country, expectedUrl) => {
        // Act
        browser.maximizeWindow();
        header.moveToCountrySelector();
        header.expectedCountry = country;

        // Assert
        expect(header.isCountryLinkDisplayed()).toBe(true);

        // Act
        header.clickCountryListItem();

        // Assert
        expect(browser.getUrl()).toContain(expectedUrl);
    });

    forEach(['au', 'gb', 'nz', 'ie', 'dk', 'es', 'it'])
    .it('should display correct country selector icon depending on which locale is chosen', country => {
        // Act
        browser.maximizeWindow();
        header.openWithLocale(country);

        // Assert
        expect(header.isCurrentCountryIconDisplayed(country)).toBe(true);
    });
});
