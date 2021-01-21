const stampcardsHeaderComponent = () => $('[data-test-id="stampcardsHeader-component"]');

exports.waitForStampcardsHeaderComponent = () => stampcardsHeaderComponent().waitForExist();

exports.isStampcardsHeaderComponentDisplayed = () => stampcardsHeaderComponent().isDisplayed();
