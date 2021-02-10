const statusBannerComponent = () => $('[data-test-id="statusBanner"]');

exports.waitForStatusBannerComponent = () => statusBannerComponent().waitForExist();

exports.isStatusBannerComponentDisplayed = () => statusBannerComponent().isDisplayed();
