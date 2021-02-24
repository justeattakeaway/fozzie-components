const Footer = require('../../../test-utils/component-objects/f-footer.component');
const footer = new Footer();
const forEach = require('mocha-each');

describe('f-footer component tests', () => {
    beforeEach(() => {
        footer.open('gb');
        footer.waitForComponent();
    });

    it('should display the footer', () => {
        // Assert
        expect(footer.isComponentDisplayed()).toBe(true);
    });

    forEach([['ios', 'apple'], ['android', 'google'], ['huawei', 'appgallery']])
    .it('should display download icons and link to correct URL', (icon, expectedUrl) => {
        // Act
        footer.expectedDownloadIcon = icon;

        // Assert
        expect(footer.isDownloadIconDisplayed()).toBe(true);

         // Act
         footer.clickDownloadIcon();

         // Assert
         expect(browser.getUrl()).toContain(expectedUrl);
    });

    forEach([['twitter', 'twitter.com'], ['facebook', 'facebook.com'], ['youtube', 'youtube.com']])
    .it('should display social media icons', (icon, expectedUrl) => {
        // Act
        footer.expectedSocialIcon = icon;

        // Assert
        expect(footer.isSocialIconDisplayed()).toBe(true);

        // Act
        footer.clickSocialIcon();

        // Assert
        expect(browser.getUrl()).toContain(expectedUrl);
    });

    it('Should not show courier links on en-GB locale if courier links is set to false', () => {
        // Assert
        expect(footer.areCourierLinksDisplayed()).toBe(false);
    });

    it('Should not show courier links on en-GB locale if courier links is set to true', () => {
        // Act
        footer.openGBWithExtraFeatures();

        // Assert
        expect(footer.areCourierLinksDisplayed()).toBe(false);
    });
});
