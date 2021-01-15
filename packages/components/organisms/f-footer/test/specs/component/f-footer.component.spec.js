import FooterComponent from '../../../test-utils/component-objects/f-footer.component';
const path = 'iframe.html?id=components-organisms--' // storybook url for all components - could move to config.
const locale = '&knob-Locale=en-GB'
const links = '&knob-Show%20courier%20links=true'

describe('f-footer component tests', () => {
    beforeEach(() => {
        browser.url(`${path}footer-component${locale}`);
        FooterComponent.waitForFooter();
    });

    it('should display the footer', () => {
        // Assert
        expect(FooterComponent.isFooterDisplayed()).toBe(true);
    });

    it('should display App Store Icons', () => {
        // Assert
        expect(FooterComponent.isIosIconDisplayed()).toBe(true);
        expect(FooterComponent.isAndroidIconDisplayed()).toBe(true);
    });

    it('App Store links should be correct', () => {
        // Act
        FooterComponent.clickIosIcon();

        // Assert
        expect(browser.getUrl()).toContain('https://apps.apple.com');

        // Act
        browser.back();
        FooterComponent.waitForFooter();
        FooterComponent.clickAndroidIcon();

        // Assert
        expect(browser.getUrl()).toContain('https://play.google.com/');
    });

    it('should display Social Media Icons', () => {
        // Assert
        expect(FooterComponent.isTwitterIconDisplayed()).toBe(true);
        expect(FooterComponent.isYoutubeIconDisplayed()).toBe(true);
        expect(FooterComponent.isFacebookIconDisplayed()).toBe(true);
    });

    it('Social Media links should be correct', () => {
        // Act
        FooterComponent.clickFacebookIcon();

        // Assert
        expect(browser.getUrl()).toContain('https://www.facebook.com');

        // Act
        browser.back();
        FooterComponent.waitForFooter();
        FooterComponent.clickTwitterIcon();

        // Assert
        expect(browser.getUrl()).toContain('https://twitter.com');

        // Act
        browser.back();
        FooterComponent.waitForFooter();
        FooterComponent.clickYoutubeIcon();

        // Assert
        expect(browser.getUrl()).toContain('https://www.youtube.com');
    });

    it('Does not show courier links on en-GB locale if courier links is set to false', () => {
        // Assert
        expect(FooterComponent.isCourierLinksDisplayed()).toBe(false);
    });

    it('Does not show courier links on en-GB locale if courier links is set to true', () => {
        // Act
        browser.url(`${path}footer-component${locale}${links}`);

        // Assert
        expect(FooterComponent.isCourierLinksDisplayed()).toBe(false);
    });
});
