import AccountInfo from '../../test-utils/component-objects/f-account-info.component';
import AccountInfoErrorCard from '../../test-utils/component-objects/f-account-info-error.component';


const devices = [
    'mobile',
    'desktop'
];

let fields;
let locales;

devices.forEach(device => {
    describe(`f-account-info - ${device}- Visual Tests`, () => {
        beforeEach(async () => {
            if (device === 'mobile') {
                await browser.setWindowSize(414, 731);
            }

            await AccountInfo.load();
        });

        it('should display the default component state', async () => {
            // Assert
            await browser.percyScreenshot('f-account-info - Base State', device);
        });

        fields = [
            'firstName',
            'lastName',
            'phoneNumber',
            'addressLine1',
            'city',
            'postcode'
        ];

        fields.forEach(field => {
            it('should display an error message immediately when %s input has been deleted', async () => {
                // Act
                await AccountInfo.clearBlurField(field);
                await AccountInfo.clickOutOfInputField();

                // Assert
                await browser.percyScreenshot(`f-account-info - ${field} Input Error Message`, device);
            });
        });

        fields = [
            'firstName',
            'lastName',
            'phoneNumber',
            'postcode'
        ];

        fields.forEach(field => {
            it(`should display the illegal ${field} error message immediately on click`, async () => {
                // Arrange
                const illegalInput = '123';

                // Act
                await AccountInfo.clearBlurField(field);
                await AccountInfo.setFieldValue(field, illegalInput);
                await AccountInfo.clickOutOfInputField();

                // Assert
                await browser.percyScreenshot(`f-account-info - illegal ${field} error message`, device);
            });
        });

        locales = ['en-GB'];

        locales.forEach(locale => {
            it(`should display the ${locale} Submit success alert if Submit succeed`, async () => {
                // Arrange
                await AccountInfo.load({ locale });
                await AccountInfo.clearBlurField('firstName');
                await AccountInfo.setFieldValue('firstName', 'Hazza'); // dirty the form to allow submit

                // Act
                await AccountInfo.clickSaveButton();

                // Assert
                await browser.percyScreenshot(`f-account-info - Submit Success Alert - ${locale}`, device);
            });

            it(`should display the ${locale} Submit error alert if Submit fails`, async () => {
                // Arrange
                await AccountInfo.load({ locale, apiState: 'patch-details-fails' });
                await AccountInfo.clearBlurField('firstName');
                await AccountInfo.setFieldValue('firstName', 'Hazza'); // dirty the form to allow submit

                // Act
                await AccountInfo.clickSaveButton();

                // Assert
                await browser.percyScreenshot(`f-account-info - Submit Error Alert - ${locale}`, device);
            });

            it(`should display the ${locale} Error page if GET fails`, async () => {
                // Act
                AccountInfoErrorCard.load({ locale, apiState: 'get-details-fails' });

                // Assert
                await browser.percyScreenshot(`f-account-info - Load Error Page - ${locale}`, device);
            });
        });
    });
});
