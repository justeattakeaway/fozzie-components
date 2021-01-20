const breadCrumbsComponent = () => $('[data-test-id="breadCrumbs-component"]');

exports.waitForBreadCrumbsComponent = () => breadCrumbsComponent().waitForExist();

exports.isBreadCrumbsComponentDisplayed = () => breadCrumbsComponent().isDisplayed();
