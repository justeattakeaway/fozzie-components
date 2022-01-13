import forEach from 'mocha-each';

const AccountInfo = require('../../test-utils/component-objects/f-account-info.component');

const PLATFORM = 'desktop';
let accountInfo;

describe('f-account-info - Desktop Visual Tests', () => {
    beforeEach(() => {
        accountInfo = new AccountInfo();

        accountInfo.load();

        accountInfo.waitForComponent();
    });

    it('should display the default component state', () => {
        // Act
        accountInfo.load();
        accountInfo.waitForComponent();

        // Assert
        browser.percyScreenshot('f-account-info - Base State', PLATFORM);
    });

    forEach(['firstName', 'lastName', 'phoneNumber', 'addressLine1', 'city', 'postcode'])
    .it('should display an error message immediately when %s input has been deleted', field => {
        // Act
        accountInfo.clearBlurField(field);
        accountInfo.clickOutOfInputField();

        // Assert
        browser.percyScreenshot(`f-account-info - ${field} Input Error Message`, PLATFORM);
    });

    it('should display the illegal first name error message immediately on click', () => {
        // Arrange
        const customerInput = {
            firstName: {
                input: '123'
            }
        };

        // Act
        accountInfo.clearBlurField('firstName');
        accountInfo.populateAccountForm('firstName', customerInput);
        accountInfo.clickOutOfInputField();

        // Assert
        browser.percyScreenshot('f-account-info - illegal first name error message', PLATFORM);
    });

    it('should display the illegal last name error message immediately on click', () => {
        // Arrange
        const customerInput = {
            lastName: {
                input: '123'
            }
        };

        // Act
        accountInfo.clearBlurField('lastName');
        accountInfo.populateAccountForm('lastName', customerInput);
        accountInfo.clickOutOfInputField();

        // Assert
        browser.percyScreenshot('f-account-info - illegal last name error message', PLATFORM);
    });

    it('should display the illegal phone number error message immediately on click', () => {
        // Arrange
        const customerInput = {
            phoneNumber: {
                input: '123'
            }
        };

        // Act
        accountInfo.clearBlurField('phoneNumber');
        accountInfo.populateAccountForm('phoneNumber', customerInput);
        accountInfo.clickOutOfInputField();

        // Assert
        browser.percyScreenshot('f-account-info - illegal phone number error message', PLATFORM);
    });

    it('should display invalid postcode error message immediately on click', () => {
        // Arrange
        const customerInput = {
            postcode: {
                input: '123'
            }
        };

        // Act
        accountInfo.clearBlurField('postcode');
        accountInfo.populateAccountForm('postcode', customerInput);
        accountInfo.clickOutOfInputField();

        // Assert
        browser.percyScreenshot('f-account-info - illegal postcode error message', PLATFORM);
    });
});
