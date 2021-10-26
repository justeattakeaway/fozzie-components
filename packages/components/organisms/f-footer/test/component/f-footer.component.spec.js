import forEach from 'mocha-each';

const Footer = require('../../test-utils/component-objects/f-footer.component');

let footer;

describe('Desktop - f-footer component tests', () => {
    beforeEach(() => {
        footer = new Footer();
        footer.withQuery('&knob-Locale', 'en-GB');
        footer.withQuery('&knob-Show country selector', 'true');
        footer.withQuery('&knob-Show courier links', 'false');

        footer.load();
    });

    forEach([['ios', 'apple'], ['android', 'google'], ['huawei', 'appgallery']])
        .it('should redirect to correct URL ("%s")', (icon, expectedUrl) => {
            // Arrange
            footer.expectedDownloadIcon = icon;

            // Act
            footer.clickDownloadIcon();

            // Assert
            expect(browser.getUrl()).toContain(expectedUrl);
        });

    forEach([['twitter', 'twitter.com'], ['facebook', 'facebook.com'], ['youtube', 'youtube.com']])
        .it('should redirect to correct URL ("%s")', (icon, expectedUrl) => {
            // Arrange
            footer.expectedSocialIcon = icon;

            // Act
            footer.clickSocialIcon();

            // Assert
            expect(browser.getUrl()).toContain(expectedUrl);
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
    ]).it('should click on link for country code "%s" and redirect to correct URL ("%s")', (country, expectedUrl) => {
        // Act
        footer.clickCountrySelectorButton();
        footer.expectedCountry = country;
        footer.clickCountryLinkItem();

        // Assert
        expect(browser.getUrl()).toContain(expectedUrl);
    });

    it('should check to see if the feedback button is clickable', () => {
        // Assert
        expect(footer.isFeedbackButtonClickable()).toBe(true);
    });
});
