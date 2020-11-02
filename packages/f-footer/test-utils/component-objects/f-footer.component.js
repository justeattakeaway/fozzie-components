const footerComponent = () => $('[data-test-id="footer-component"]');
const footerIcons = () => $$('[data-test-id="footerIcon"]');
const iosIcon = () => footerIcons()[0];
const androidIcon = () => footerIcons()[1];
const facebookIcon = () => footerIcons()[2];
const twitterIcon = () => footerIcons()[3];
const instagramIcon = () => footerIcons()[4];

exports.isFooterDisplayed = () => footerComponent().isDisplayed();
exports.isIosIconDisplayed = () => iosIcon().isDisplayed();
exports.isAndroidIconDisplayed = () => androidIcon().isDisplayed();
exports.isFacebookIconDisplayed = () => facebookIcon().isDisplayed();
exports.isTwitterIconDisplayed = () => twitterIcon().isDisplayed();
exports.isInstagramIconDisplayed = () => instagramIcon().isDisplayed();
exports.waitForFooter = () => footerComponent().waitForExist();


exports.clickIosIcon = () => iosIcon().click();
exports.clickAndroidIcon = () => androidIcon().click();
exports.clickFacebookIcon = () => facebookIcon().click();
exports.clickTwitterIcon = () => twitterIcon().click();
exports.clickInstagramIcon = () => instagramIcon().click();
