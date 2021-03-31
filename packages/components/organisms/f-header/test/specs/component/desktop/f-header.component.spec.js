const forEach = require('mocha-each');
const Header = require('../../../../test-utils/component-objects/f-header.component');
const header = new Header();

describe('Desktop - f-header component tests', () => {
    beforeEach(() => {
        const headerData = {
            locale: 'gb',
            offers: true,
            delivery: true
        };

        header.open(headerData);
        header.waitForComponent();
        browser.maximizeWindow();
    });

    forEach(['offersLink', 'delivery', 'help', 'countrySelector', 'userAccount'])
    .it('should display all navigation links', field => {
        // Assert
        expect(header.isFieldLinkDisplayed(field)).toBe(true);
    });

    forEach(['au', 'ie', 'nz'])
    .it('should display the below navigation links', expectedLocale => {
        // Arrange
        const headerData = {
            locale: expectedLocale,
            offers: true,
            delivery: true
        };

        // Act
        ['offersLink', 'userAccount', 'help', 'countrySelector'].forEach(link => {
            header.open(headerData);
            header.waitForComponent();

            // Assert
            expect(header.isFieldLinkDisplayed(link)).toBe(true);
            expect(header.isFieldLinkDisplayed('delivery')).toBe(false);
        });
    });

    forEach(['it', 'es', 'dk', 'no'])
    .it('should display the below navigation links', expectedLocale => {
        // Arrange
        const headerData = {
            locale: expectedLocale,
            offers: true,
            delivery: true
        };

        // Act
        ['userAccount', 'help', 'countrySelector'].forEach(link => {
            header.open(headerData);
            header.waitForComponent();

            // Assert
            expect(header.isFieldLinkDisplayed(link)).toBe(true);
            expect(header.isFieldLinkDisplayed('offersLink')).toBe(false);
            expect(header.isFieldLinkDisplayed('delivery')).toBe(false);
        });
    });

    forEach([['gb', '.co.uk'], ['au', 'au'], ['at', 'at'], ['be', 'be-en'], ['bg', 'bg'], ['ca_en', 'skipthedishes.com'], ['ca_fr', 'skipthedishes.com/fr'], ['dk', '.dk'], ['jet_fr', '.fr'], ['de', '.de'], ['ie', '.ie'], ['il', '.il'], ['it', '.it'], 
    ['lu', 'lu-en'], ['nl', '.nl'], ['nz', '.nz'], ['no', '.no'], ['pl', '.pl'], ['pt', '/pt'], ['ro', '/ro'], ['es', '.es'], ['ch_ch', '.ch'], ['ch_en', '/en'], ['ch_fr', '/fr'] ])
    .it('should display all countries and redirect to correct URL', (expectedLocale, expectedUrl) => {
        // Act
        // browser.maximizeWindow();
        header.moveToCountrySelector();
        header.expectedCountry = expectedLocale;

        // Assert
        expect(header.isCountryLinkDisplayed()).toBe(true);

        // Act
        header.clickCountryListItem();

        // Assert
        expect(browser.getUrl()).toContain(expectedUrl);
    });

    forEach(['au', 'gb', 'nz', 'ie', 'dk', 'es', 'it'])
    .it('should display correct country selector icon depending on which locale is chosen', expectedLocale => {
        // Arrange
        const headerData = {
            locale: expectedLocale,
            offers: true,
            delivery: true
        };

        // Act
        // browser.maximizeWindow();
        header.open(headerData);
        header.waitForComponent();

        // Assert
        expect(header.isCurrentCountryIconDisplayed(expectedLocale)).toBe(true);
    });
});
