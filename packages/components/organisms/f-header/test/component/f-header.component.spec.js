import Header from '../../test-utils/component-objects/f-header.component';

describe('Desktop - f-header component tests', () => {
    beforeEach(async () => {
        // Act
        await Header.load({ showOffersLink: true, showDeliveryEnquiry: true, showCorporateLink: true });
        await browser.maximizeWindow();
    });


    const links = [
        'help',
        'userAccount',
        'countrySelector',
        'corporate',
        'offersLink',
        'delivery'
    ];

    links.forEach(link => {
        it(`should test that ${link} navigation link is clickable`, async () => {
            // Assert
            await expect(await Header.isNavigationItemClickable(link)).toBe(true);
        });
    });

    const tests = [
        { expectedLocale: 'gb', expectedUrl: 'just-eat.co.uk' },
        { expectedLocale: 'au', expectedUrl: 'menulog.com.au' },
        { expectedLocale: 'at', expectedUrl: 'lieferando.at' },
        { expectedLocale: 'be', expectedUrl: 'takeaway.com/be' },
        { expectedLocale: 'bg', expectedUrl: 'takeaway.com/bg' },
        { expectedLocale: 'ca_en', expectedUrl: 'skipthedishes.com' },
        { expectedLocale: 'ca_fr', expectedUrl: 'skipthedishes.com/fr' },
        { expectedLocale: 'dk', expectedUrl: 'just-eat.dk' },
        { expectedLocale: 'jet_fr', expectedUrl: 'just-eat.fr' },
        { expectedLocale: 'de', expectedUrl: 'lieferando.de' },
        { expectedLocale: 'ie', expectedUrl: 'just-eat.ie' },
        { expectedLocale: 'il', expectedUrl: '10bis.co.il' },
        { expectedLocale: 'it', expectedUrl: 'justeat.it' },
        { expectedLocale: 'lu', expectedUrl: 'takeaway.com/lu' },
        { expectedLocale: 'nl', expectedUrl: 'thuisbezorgd.nl' },
        { expectedLocale: 'no', expectedUrl: 'just-eat.no' },
        { expectedLocale: 'pl', expectedUrl: 'pyszne.pl' },
        { expectedLocale: 'es', expectedUrl: 'just-eat.es' },
        { expectedLocale: 'ch_ch', expectedUrl: 'eat.ch' },
        { expectedLocale: 'ch_en', expectedUrl: 'eat.ch/en' },
        { expectedLocale: 'ch_fr', expectedUrl: 'eat.ch/fr' }
    ];

    tests.forEach(({ expectedLocale, expectedUrl }) => {
        it(`should display link for country code ${expectedLocale} and redirect to correct URL (${expectedUrl})`, async () => {
            // Act
            await Header.moveToNavigationLink('countrySelector');
            await Header.clickCountryListItem(expectedLocale);

            // Assert
            await expect(await browser.getUrl()).toContain(expectedUrl);
        });
    });
});
