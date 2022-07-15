import ContactPreferences from '../../test-utils/component-objects/f-contactPreferences.component';
import ContactPreferencesError from '../../test-utils/component-objects/f-contactPreferences-error.component';

const devices = [
    'desktop',
    'mobile'
];

devices.forEach(device => {
    describe(`f-contact-preferences - ${devices} Visual Tests`, () => {
        const tests = [
            'en-GB'
        ];

        beforeEach(async () => {
            if (device === 'mobile') {
                await browser.setWindowSize(414, 731);
            }
        });

        tests.forEach(locale => {
            it(`should display the ${locale} default component state`, async () => {
                // Act
                await ContactPreferences.load({ locale });

                // Assert
                await browser.percyScreenshot(`f-contact-preferences - Base State - ${locale}`, device);
            });

            it(`should display the ${locale} news email & sms checked`, async () => {
                // Act
                await ContactPreferences.load({ locale });
                await ContactPreferences.clickNewsEmailCheckbox();
                await ContactPreferences.clickNewsSmsCheckbox();

                // Assert
                await browser.percyScreenshot(`f-contact-preferences - Checked Preferences State - ${locale}`, device);
            });

            it(`should display the ${locale} Submit success alert`, async () => {
                // Act
                await ContactPreferences.load({ locale });
                await ContactPreferences.clickNewsEmailCheckbox(); // dirty the form to allow submit
                await ContactPreferences.clickSubmitButton();
                await ContactPreferences.waitForComponent();

                // Assert
                await browser.percyScreenshot(`f-contact-preferences - Submit Success Alert - ${locale}`, device);
            });

            it(`should display the ${locale} Submit error alert`, async () => {
                // Act
                await ContactPreferences.load({
                    locale,
                    apiState: 'post-preferences-fails'
                });
                await ContactPreferences.clickNewsEmailCheckbox(); // dirty the form to allow submit
                await ContactPreferences.clickSubmitButton();
                await ContactPreferences.waitForComponent();

                // Assert
                await browser.percyScreenshot(`f-contact-preferences - Submit Error Alert - ${locale}`, device);
            });

            it(`should display the ${locale} Load error page`, async () => {
                // Act
                await ContactPreferencesError.load({
                    locale,
                    apiState: 'get-preferences-fails'
                });

                // Assert
                await browser.percyScreenshot(`f-contact-preferences - Load Error Page - ${locale}`, device);
            });
        });
    });
});
