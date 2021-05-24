import cookieBanner from '../../test-utils/component-objects/f-cookieBanner-legacy.component';

describe('Legacy - f-cookieBanner component tests - @browserstack', () => {
    it('should display the f-cookieBanner component', tenant => {
        // Arrange
        cookieBanner.open(tenant);
        cookieBanner.waitForComponent();

        // Assert
        expect(cookieBanner.isCookieBannerComponentDisplayed()).toBe(true);
    });
});
