import forEach from 'mocha-each';

const AccountInfo = require('../../test-utils/component-objects/f-account-info.component');

forEach(['desktop', 'mobile'])
.describe('f-account-info - Visual Tests', device => {
    let accountInfo;

    beforeEach(() => {
        if (device === 'mobile') {
            browser.setWindowSize(414, 731);
        }

        accountInfo = new AccountInfo();
    });

    it('should display the default component state', () => {
        // Act
        accountInfo.load();

        // Assert
        browser.percyScreenshot('f-account-info - Base State', device);
    });

    forEach(['firstName', 'lastName', 'phoneNumber', 'addressLine1', 'city', 'postcode'])
    .it('should display an error message immediately when %s input has been deleted', field => {
        // Act
        accountInfo.load();
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
        accountInfo.load();
        accountInfo.clearBlurField(field);
        accountInfo.setFieldValue(field, illegalInput);
        accountInfo.clickOutOfInputField();

        // Assert
        browser.percyScreenshot(`f-account-info - illegal ${field} error message`, device);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Error page if GET fails', locale => {
        // Arrange
        accountInfo
        .withQuery('args', `locale:${locale};apiState:get-details-fails`);

        // Act
        accountInfo.loadError();

        // Assert
        browser.percyScreenshot(`f-account-info - Load Error Page - ${locale}`, device);
    });
});
