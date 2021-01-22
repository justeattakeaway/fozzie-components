import FooterComponent from '../../../test-utils/component-objects/f-footer.component';
import { KNOBS } from '../../../test-utils/component-objects/f-footer.selectors';
import { ORGANISMS, GB_LOCALE } from '../../../../../../../url.selectors'

describe('f-footer component tests', () => {
    beforeEach(() => {
        browser.url(`${ORGANISMS}footer-component${GB_LOCALE}`);
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

    it('Should not show courier links on en-GB locale if courier links is set to false', () => {
        // Assert
        expect(FooterComponent.isCourierLinksDisplayed()).toBe(false);
    });

    it('Should not show courier links on en-GB locale if courier links is set to true', () => {
        // Act
        browser.url(`${ORGANISMS}footer-component${GB_LOCALE}${KNOBS}`);

        // Assert
        expect(FooterComponent.isCourierLinksDisplayed()).toBe(false);
    });
});
