import {
    FOOTER_COMPONENT,
    FOOTER_ICONS,
    COURIER_LINKS
} from './f-footer.selctors';

// Component
const footerComponent = () => $(FOOTER_COMPONENT);
const footerIcons = () => $$(FOOTER_ICONS);
const courierLinks = () => $(COURIER_LINKS);

// Icons
const iosIcon = () => footerIcons()[0];
const androidIcon = () => footerIcons()[1];
const huaweiIcon = () => footerIcons()[1];
const facebookIcon = () => footerIcons()[3];
const twitterIcon = () => footerIcons()[4];
const youtubeIcon = () => footerIcons()[5];

// Functions
exports.isFooterDisplayed = () => footerComponent().isDisplayed();
exports.isIosIconDisplayed = () => iosIcon().isDisplayed();
exports.isAndroidIconDisplayed = () => androidIcon().isDisplayed();
exports.isHuaweiIconDisplayed = () => huaweiIcon().isDisplayed();
exports.isFacebookIconDisplayed = () => facebookIcon().isDisplayed();
exports.isTwitterIconDisplayed = () => twitterIcon().isDisplayed();
exports.isYoutubeIconDisplayed = () => youtubeIcon().isDisplayed();
exports.waitForFooter = () => footerComponent().waitForExist();
exports.isCourierLinksDisplayed = () => courierLinks().isDisplayed();

// Click Function
exports.clickIosIcon = () => iosIcon().click();
exports.clickAndroidIcon = () => androidIcon().click();
exports.clickFacebookIcon = () => facebookIcon().click();
exports.clickTwitterIcon = () => twitterIcon().click();
exports.clickYoutubeIcon = () => youtubeIcon().click();
