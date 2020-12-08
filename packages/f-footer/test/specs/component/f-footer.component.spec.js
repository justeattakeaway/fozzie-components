import FooterComponent from '../../../test-utils/component-objects/f-footer.component';

describe('f-footer component tests', () => {
    beforeEach(() => {
        browser.url('?path=/story/components-organisms--footer-component');
        browser.switchToFrame(0);
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
        browser.switchToFrame(0);
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
        browser.switchToFrame(0);
        FooterComponent.waitForFooter();
        FooterComponent.clickTwitterIcon();

        // Assert
        expect(browser.getUrl()).toContain('https://twitter.com');

        // Act
        browser.back();
        browser.switchToFrame(0);
        FooterComponent.waitForFooter();
        FooterComponent.clickYoutubeIcon();

        // Assert
        expect(browser.getUrl()).toContain('https://www.youtube.com');
    });
});
