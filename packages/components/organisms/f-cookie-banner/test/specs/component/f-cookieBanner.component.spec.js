const CookieBanner = require('../../../test-utils/component-objects/f-cookieBanner.component');
const cookieBanner = new CookieBanner();

describe('f-cookieBanner component tests', () => {
    beforeEach(() => {
        cookieBanner.open()
        cookieBanner.waitForComponent();
    });

    it('should display the f-cookieBanner component', () => {
        // Assert
        expect(cookieBanner.isCookieBannerComponentDisplayed()).toBe(true);
    });
});
