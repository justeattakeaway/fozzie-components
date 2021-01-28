const tabsComponent = () => $('[data-test-id="tabs-component"]');

exports.waitForTabsComponent = () => tabsComponent().waitForExist();

exports.isTabsComponentDisplayed = () => tabsComponent().isDisplayed();
