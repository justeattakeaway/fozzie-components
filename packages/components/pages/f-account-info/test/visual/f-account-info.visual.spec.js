import forEach from 'mocha-each';

const AccountInfo = require('../../test-utils/component-objects/f-account-info.component');

forEach(['desktop', 'mobile'])
.describe('f-account-info - Visual Tests', device => {
    let accountInfo;

    beforeEach(async () => {
        if (device === 'mobile') {
            await browser.setWindowSize(414, 731);
        }

        accountInfo = new AccountInfo();

        await accountInfo.load();

        await accountInfo.waitForComponent();
    });

    it('should display the default component state', async () => {
        // Act
        await accountInfo.load();
        await accountInfo.waitForComponent();

        // Assert
        await browser.percyScreenshot('f-account-info - Base State', device);
    });

    forEach(['firstName', 'lastName', 'phoneNumber', 'addressLine1', 'city', 'postcode'])
    .it('should display an error message immediately when %s input has been deleted', async field => {
        // Act
        await accountInfo.load();
        await accountInfo.clearBlurField(field);
        await accountInfo.clickOutOfInputField();

        // Assert
        await browser.percyScreenshot(`f-account-info - ${field} Input Error Message`, device);
    });

    forEach(['firstName', 'lastName', 'phoneNumber', 'postcode'])
    .it('should display the illegal %s error message immediately on click', async field => {
        // Arrange
        const illegalInput = '123';

        // Act
        await accountInfo.load();
        await accountInfo.clearBlurField(field);
        await accountInfo.setFieldValue(field, illegalInput);
        await accountInfo.clickOutOfInputField();

        // Assert
        await browser.percyScreenshot(`f-account-info - illegal ${field} error message`, device);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Error page if GET fails', async locale => {
        // Act
        accountInfo.load({ locale, apiState: 'get-details-fails' });

        // Assert
        await browser.percyScreenshot(`f-account-info - Load Error Page - ${locale}`, device);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Submit success alert if Submit succeed', async locale => {
        // Arrange
        await accountInfo.load({ locale });
        await accountInfo.clearBlurField('firstName');
        await accountInfo.setFieldValue('firstName', 'Hazza'); // dirty the form to allow submit

        // Act
        await accountInfo.clickSaveButton();

        // Assert
        await browser.percyScreenshot(`f-account-info - Submit Success Alert - ${locale}`, device);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Submit error alert if Submit fails', async locale => {
        // Arrange
        await accountInfo.load({ locale, apiState: 'patch-details-fails' });
        await accountInfo.clearBlurField('firstName');
        await accountInfo.setFieldValue('firstName', 'Hazza'); // dirty the form to allow submit

        // Act
        await accountInfo.clickSaveButton();

        // Assert
        await browser.percyScreenshot(`f-account-info - Submit Error Alert - ${locale}`, device);
    });
});
