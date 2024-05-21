import Footer from '../../test-utils/component-objects/f-footer.component';

let tests;

describe('Desktop - f-footer component tests', () => {
    tests = [
        { icon: 'ios', expectedUrl: 'apple' },
        { icon: 'android', expectedUrl: 'google' },
        { icon: 'huawei', expectedUrl: 'appgallery' },
        { icon: 'X', expectedUrl: 'x.com' },
        { icon: 'facebook', expectedUrl: 'facebook.com' },
        { icon: 'youtube', expectedUrl: 'youtube.com' }
    ];

    tests.forEach(({ icon, expectedUrl }) => {
        it(`should redirect to correct URL ("${expectedUrl}")`, async () => {
            // Act
            await Footer.load({ locale: 'en-GB', showCountrySelector: true });
            await Footer.clickIcon(icon);

            // Assert
            await expect(await browser.getUrl()).toContain(expectedUrl);
        });
    });

    tests = [
        { country: 'au', expectedUrl: 'menulog.com.au' },
        { country: 'at', expectedUrl: 'lieferando.at' },
        { country: 'be', expectedUrl: 'takeaway.com/be' },
        { country: 'bg', expectedUrl: 'takeaway.com/bg' },
        { country: 'ca_en', expectedUrl: 'skipthedishes.com' },
        { country: 'dk', expectedUrl: 'just-eat.dk' },
        { country: 'jet_fr', expectedUrl: 'just-eat.fr' },
        { country: 'de', expectedUrl: 'lieferando.de' },
        { country: 'ie', expectedUrl: 'just-eat.ie' },
        { country: 'il', expectedUrl: '10bis.co.il' },
        { country: 'it', expectedUrl: 'justeat.it' },
        { country: 'lu', expectedUrl: 'takeaway.com/lu' },
        { country: 'nl', expectedUrl: 'thuisbezorgd.nl' },
        { country: 'no', expectedUrl: 'just-eat.no' },
        { country: 'pl', expectedUrl: 'pyszne.pl' },
        { country: 'es', expectedUrl: 'just-eat.es' },
        { country: 'ch_ch', expectedUrl: 'eat.ch' },
        { country: 'ch_en', expectedUrl: 'eat.ch/en' },
        { country: 'ch_fr', expectedUrl: 'eat.ch/fr' },
        { country: 'sk', expectedUrl: 'www.bistro.sk' }
    ];

    tests.forEach(({ country, expectedUrl }) => {
        it(`should click on link for country code "${country}" and redirect to correct URL ("${expectedUrl}")`, async () => {
            // Act
            await Footer.load({ locale: 'en-GB', showCountrySelector: true });
            await Footer.clickCountrySelectorButton();
            await Footer.clickCountryLinkItem(country);

            // Assert
            await expect(await browser.getUrl()).toContain(expectedUrl);
        });
    });

    it('should check to see if the feedback button is clickable', async () => {
        // Act
        await Footer.load({ locale: 'en-GB', showCountrySelector: true });

        // Assert
        await expect(await Footer.isFeedbackButtonClickable()).toBe(true);
    });
});
