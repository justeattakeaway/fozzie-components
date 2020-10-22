const searchboxComponent = () => $('[data-test-id="searchbox-component"]');

exports.waitForSearchboxComponent = () => searchboxComponent().waitForExist();

exports.isSearchboxComponentDisplayed = () => searchboxComponent().isDisplayed();
