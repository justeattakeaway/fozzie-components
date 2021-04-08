const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');

const Footer = require('../../../../test-utils/component-objects/f-footer.component');

const footer = new Footer('organism', 'footer-component');

describe('Desktop - f-footer component tests', () => {
    beforeEach(() => {

        footer.withQuery('&knob-Locale', 'en-gb');
        footer.withQuery('&knob-Show courier links', 'false');
        footer.withQuery('&knob-Show country selector', 'true');
        const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);

        footer.open(pageUrl);
        footer.waitForComponent();
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
});
