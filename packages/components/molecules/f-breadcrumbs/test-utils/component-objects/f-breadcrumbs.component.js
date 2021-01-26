const breadcrumbsComponent = () => $('[data-test-id="breadcrumbs-component"]');

exports.waitForBreadCrumbsComponent = () => breadcrumbsComponent().waitForExist();

exports.isBreadCrumbsComponentDisplayed = () => breadcrumbsComponent().isDisplayed();
