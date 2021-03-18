const CookieBanner = require('../../../../test-utils/component-objects/f-cookieBanner-new.component');
const cookieBanner = new CookieBanner();

describe('New - f-cookieBanner component tests', () => {
    beforeEach(() => {
        cookieBanner.open();
        cookieBanner.waitForComponent();
    });

    it('should display the f-cookieBanner content', () => {
        // Assert
        expect(cookieBanner.isCookieBannerContentDisplayed()).toBe(true);
    });

     it('should display the f-cookieBanner accept all button', () => {
        // Assert
        expect(cookieBanner.isCookieBannerAcceptAllButtonDisplayed()).toBe(true);
    });

    it('should display the f-cookieBanner accept necessary button', () => {
        // Assert
        expect(cookieBanner.isCookieBannerAcceptNecessaryButtonDisplayed()).toBe(true);
    });
});
