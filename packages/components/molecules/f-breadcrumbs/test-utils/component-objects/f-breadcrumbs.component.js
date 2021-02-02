const breadcrumbsComponent = () => $('[data-test-id="breadcrumbs-component"]');

exports.waitForBreadcrumbsComponent = () => breadcrumbsComponent().waitForExist();

exports.isBreadcrumbsComponentDisplayed = () => breadcrumbsComponent().isDisplayed();
