import CookieBannerComponent from '../../../test-utils/component-objects/f-cookieBanner.component';

describe('f-cookieBanner component tests', () => {
    beforeEach(() => {
        browser.url('?path=/story/components-organisms--cookie-banner-component'); //This URL may be wrong, worth checking in storybook!
        browser.switchToFrame(0);
        CookieBannerComponent .waitForCookieBannerComponent();
    });

    it('should display the f-cookieBanner component', () => {
        // Assert
        expect(CookieBannerComponent.isCookieBannerComponentDisplayed()).toBe(true);
    });
});
