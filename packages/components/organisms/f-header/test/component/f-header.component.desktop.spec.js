import forEach from 'mocha-each';

const Header = require('../../test-utils/component-objects/f-header.component');

const header = new Header();

describe('Desktop - f-header component tests - @browserstack', () => {
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
    .it('should display all navigation links', link => {
        // Assert
        expect(header.isNavigationLinkDisplayed(link)).toBe(true);
    });

    forEach(['au', 'ie', 'nz'])
    .it('should display the below navigation links for country code "%s"', expectedLocale => {
        // Arrange
        const headerData = {
            locale: expectedLocale,
            offers: true,
            delivery: true
        };

        ['offersLink', 'userAccount', 'help', 'countrySelector'].forEach(link => {
            // Act
            header.open(headerData);
            header.waitForComponent();

            // Assert
            expect(header.isNavigationLinkDisplayed(link)).toBe(true);
            expect(header.isNavigationLinkDisplayed('delivery')).toBe(false);
        });
    });

    forEach(['it', 'es', 'dk', 'no'])
    .it('should display the below navigation links for country code "%s"', expectedLocale => {
        // Arrange
        const headerData = {
            locale: expectedLocale,
            offers: true,
            delivery: true
        };

        ['userAccount', 'help', 'countrySelector'].forEach(link => {
            // Act
            header.open(headerData);
            header.waitForComponent();

            // Assert
            expect(header.isNavigationLinkDisplayed(link)).toBe(true);
            expect(header.isNavigationLinkDisplayed('offersLink')).toBe(false);
            expect(header.isNavigationLinkDisplayed('delivery')).toBe(false);
        });
    });

    forEach([
        ['gb', '.co.uk'],
        ['dk', '.dk'],
        ['no', '.no'],
        ['au', 'au'],
        ['at', 'at'],
        ['be', 'be-en'],
        ['bg', 'bg'],
        ['ca_en', 'skipthedishes.com'],
        ['jet_fr', '.fr'],
        ['de', '.de'],
        ['ie', '.ie'],
        ['il', '.il'],
        ['it', '.it']])
    .it('should display link for country code "%s" and redirect to correct URL ("%s")', (expectedLocale, expectedUrl) => {
        // Act
        header.moveToCountrySelector();
        header.expectedCountry = expectedLocale;

        // Assert
        expect(header.isCountryLinkDisplayed()).toBe(true);

        // Act
        header.clickCountryListItem();

        // Assert
        expect(browser.getUrl()).toContain(expectedUrl);
    });

    forEach([
        ['lu', 'lu-en'],
        ['nl', '.nl'],
        ['nz', '.nz'],
        ['pl', '.pl'],
        ['pt', '/pt'],
        ['ro', '/ro'],
        ['es', '.es'],
        ['ch_ch', '.ch'],
        ['ch_en', '/en'],
        ['ch_fr', '/fr']])
    .it('should display link for country code "%s" and redirect to correct URL ("%s")', (expectedLocale, expectedUrl) => {
        // Act
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
    .it('should display correct selector icon for country code "%s" depending on which locale is chosen', expectedLocale => {
        // Arrange
        const headerData = {
            locale: expectedLocale,
            offers: true,
            delivery: true
        };

        // Act
        header.open(headerData);
        header.waitForComponent();

        // Assert
        expect(header.isCurrentCountryIconDisplayed(expectedLocale)).toBe(true);
    });
});
