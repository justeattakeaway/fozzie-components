const mediaElementComponent = () => $('[data-test-id="mediaElement-component"]');

exports.waitForMediaElementComponent = () => mediaElementComponent().waitForExist();

exports.isMediaElementComponentDisplayed = () => mediaElementComponent().isDisplayed();
