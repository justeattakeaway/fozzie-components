import forEach from 'mocha-each';

const AccountInfo = require('../../test-utils/component-objects/f-account-info.component');

let accountInfo;

forEach(['desktop', 'mobile'])
.describe('f-account-info - Visual Tests', device => {
    beforeEach(() => {
        if (device === 'mobile') {
            browser.setWindowSize(414, 731);
        }

        accountInfo = new AccountInfo();

        accountInfo.load();

        accountInfo.waitForComponent();
    });

    it('should display the default component state', () => {
        // Act
        accountInfo.load();
        accountInfo.waitForComponent();

        // Assert
        browser.percyScreenshot('f-account-info - Base State', device);
    });

    forEach(['firstName', 'lastName', 'phoneNumber', 'addressLine1', 'city', 'postcode'])
    .it('should display an error message immediately when %s input has been deleted', field => {
        // Act
        accountInfo.clearBlurField(field);
        accountInfo.clickOutOfInputField();

        // Assert
        browser.percyScreenshot(`f-account-info - ${field} Input Error Message`, device);
    });

    forEach(['firstName', 'lastName', 'phoneNumber', 'postcode'])
    .it('should display the illegal %s error message immediately on click', field => {
        // Arrange
        const illegalInput = '123';

        // Act
        accountInfo.clearBlurField(field);
        accountInfo.setFieldValue(field, illegalInput);
        accountInfo.clickOutOfInputField();

        // Assert
        browser.percyScreenshot(`f-account-info - illegal ${field} error message`, device);
    });
});
