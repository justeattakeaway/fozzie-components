import CookieBannerComponent from '../../../test-utils/component-objects/f-cookieBanner.component';

describe('f-cookieBanner component tests', () => {
    beforeEach(() => {
        // Arrange
        browser.url('http://localhost:8080');
    })

    it('should display the f-cookieBanner component', () => {
        // Assert
        expect(CookieBannerComponent.isCookieBannerComponentDisplayed()).toBe(true);
    });
});
