import forEach from 'mocha-each';

const Header = require('../../test-utils/component-objects/f-header.component');

let header;

describe('Desktop - f-header component tests', () => {
    beforeEach(() => {
        // Arrange
        const controls = [
            'showOffersLink:true',
            'showDeliveryEnquiry:true'
        ].join(';');

        header = new Header();
        header.path += `&args=${controls}`;

        // Act
        header.load();
        browser.maximizeWindow();
    });

    forEach(['help', 'userAccount', 'countrySelector', 'offersLink', 'delivery'])
    .it('should test that %s navigation link is clickable', link => {
        // Assert
        expect(header.isNavigationItemClickable(link)).toBe(true);
    });

    forEach([
        ['gb', 'just-eat.co.uk'],
        ['au', 'menulog.com.au'],
        ['at', 'lieferando.at'],
        ['be', 'takeaway.com/be'],
        ['bg', 'takeaway.com/bg'],
        ['ca_en', 'skipthedishes.com'],
        ['ca_fr', 'skipthedishes.com/fr'],
        ['dk', 'just-eat.dk'],
        ['jet_fr', 'just-eat.fr'],
        ['de', 'lieferando.de'],
        ['ie', 'just-eat.ie'],
        ['il', '10bis.co.il'],
        ['it', 'justeat.it'],
        ['lu', 'takeaway.com/lu'],
        ['nl', 'thuisbezorgd.nl'],
        ['nz', 'menulog.co.nz'],
        ['no', 'just-eat.no'],
        ['pl', 'pyszne.pl'],
        ['pt', 'takeaway.com/pt'],
        ['ro', 'takeaway.com/ro'],
        ['es', 'just-eat.es'],
        ['ch_ch', 'eat.ch'],
        ['ch_en', 'eat.ch/en'],
        ['ch_fr', 'eat.ch/fr']
    ])
        .it('should display link for country code "%s" and redirect to correct URL ("%s")', (expectedLocale, expectedUrl) => {
            // Act
            header.moveToNavigationLink('countrySelector');
            header.expectedCountry = expectedLocale;

            // Assert
            expect(header.isCountryLinkDisplayed()).toBe(true);

            // Act
            header.clickCountryListItem();

            // Assert
            expect(browser.getUrl()).toContain(expectedUrl);
        });
});
