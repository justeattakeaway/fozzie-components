import StatusBannerComponent from '../../../test-utils/component-objects/f-statusBanner.component';

xdescribe('f-statusBanner component tests', () => {
    beforeEach(() => {
        browser.url('?path=story/components-organisms--status-banner-component');
        browser.switchToFrame(0);
        StatusBannerComponent.waitForStatusBannerComponent();
    });

    it('should display the f-statusBanner component', () => {
        // Assert
        expect(StatusBannerComponent.isStatusBannerComponentDisplayed()).toBe(true);
    });
});
