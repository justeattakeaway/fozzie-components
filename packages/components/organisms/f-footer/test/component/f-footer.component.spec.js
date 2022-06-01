import forEach from 'mocha-each';

const Footer = require('../../test-utils/component-objects/f-footer.component');

let footer;

describe('Desktop - f-footer component tests', () => {
    beforeEach(async () => {
        // Arrange
        footer = new Footer();
        await footer.withQuery('args', 'locale:en-GB;showCountrySelector:true');

        // Act
        await footer.load();
    });

    forEach([
        ['ios', 'apple'],
        ['android', 'google'],
        ['huawei', 'appgallery'],
        ['twitter', 'twitter.com'],
        ['facebook', 'facebook.com'],
        ['youtube', 'youtube.com']
    ])
    .it('should redirect to correct URL ("%s")', async (icon, expectedUrl) => {
        // Act
        await footer.clickIcon(icon);

        // Assert
        await expect(await browser.getUrl()).toContain(expectedUrl);
    });

    forEach([
        ['au', 'menulog.com.au'],
        ['at', 'lieferando.at'],
        ['be', 'takeaway.com/be'],
        ['bg', 'takeaway.com/bg'],
        ['ca_en', 'skipthedishes.com'],
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
    ]).it('should click on link for country code "%s" and redirect to correct URL ("%s")', async (country, expectedUrl) => {
        // Act
        await footer.clickCountrySelectorButton();
        await footer.clickCountryLinkItem(country);

        // Assert
        await expect(await browser.getUrl()).toContain(expectedUrl);
    });

    it('should check to see if the feedback button is clickable', async () => {
        // Assert
        await expect(await footer.isFeedbackButtonClickable()).toBe(true);
    });
});
