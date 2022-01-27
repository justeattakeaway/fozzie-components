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

    it('should display the illegal first name error message immediately on click', () => {
        // Arrange
        const input = '123';

        // Act
        accountInfo.clearBlurField('firstName');
        accountInfo.setFieldValue('firstName', input);
        accountInfo.clickOutOfInputField();

        // Assert
        browser.percyScreenshot('f-account-info - illegal first name error message', device);
    });

    it('should display the illegal last name error message immediately on click', () => {
        // Arrange
        const input = '123';

        // Act
        accountInfo.clearBlurField('lastName');
        accountInfo.setFieldValue('lastName', input);
        accountInfo.clickOutOfInputField();

        // Assert
        browser.percyScreenshot('f-account-info - illegal last name error message', device);
    });

    it('should display the illegal phone number error message immediately on click', () => {
        // Arrange
        const input = '123';

        // Act
        accountInfo.clearBlurField('phoneNumber');
        accountInfo.setFieldValue('phoneNumber', input);
        accountInfo.clickOutOfInputField();

        // Assert
        browser.percyScreenshot('f-account-info - illegal phone number error message', device);
    });

    it('should display invalid postcode error message immediately on click', () => {
        // Arrange
        const input = '123';
        // Act
        accountInfo.clearBlurField('postcode');
        accountInfo.setFieldValue('postcode', input);
        accountInfo.clickOutOfInputField();

        // Assert
        browser.percyScreenshot('f-account-info - illegal postcode error message', device);
    });
});
