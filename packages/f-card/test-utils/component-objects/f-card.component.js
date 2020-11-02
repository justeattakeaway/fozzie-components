const cardComponent = () => $('[data-test-id="card-component"]');

exports.isCardDisplayed = () => cardComponent().isDisplayed();
exports.waitForCard = () => cardComponent().waitForExist();
