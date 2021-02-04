const cookieBannerComponent = () => $('[data-test-id="cookieBanner-component"]');

exports.waitForCookieBannerComponent = () => cookieBannerComponent().waitForExist();

exports.isCookieBannerComponentDisplayed = () => cookieBannerComponent().isDisplayed();
