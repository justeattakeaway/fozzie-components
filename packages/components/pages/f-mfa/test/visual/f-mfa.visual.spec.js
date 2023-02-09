import Mfa from '../../test-utils/component-objects/f-mfa.component';

const devices = [
    'desktop',
    'mobile'
];

const illegalCode = '123';

const locales = [
    'en-GB',
    'en-AU',
    'en-NZ',
    'en-IE',
    'es-ES',
    'it-IT'
];

devices.forEach(device => {
    locales.forEach(locale => {
        describe('f-mfa - Visual tests', () => {
            beforeEach(async () => {
                // Arrange
                if (device === 'mobile') {
                    await browser.setWindowSize(414, 731);
                }

                // Act
                await Mfa.load({ locale });
            });

            it(`should display the ${locale} f-mfa base component`, async () => {
                // Assert
                await browser.percyScreenshot(`f-mfa - ${locale} Base Component`, device);
            });

            it('should display the f-mfa help page', async () => {
                // Act
                await Mfa.goToHelp();

                // Assert
                await browser.percyScreenshot(`f-mfa - ${locale} Help Page`, device);
            });

            it('should display the f-mfa illegal code error on the page', async () => {
                // Act
                await Mfa.setFieldValue('mfaCodeInput', illegalCode);
                await Mfa.goToSubmit();

                // Assert
                await browser.percyScreenshot(`f-mfa - ${locale} Code Error`, device);
            });

            it('should display the f-mfa load error page', async () => {
                // Act
                await Mfa.load({
                    code: '',
                    locale
                });

                // Assert
                await browser.percyScreenshot(
                    `f-mfa - ${locale} Load Error Page`,
                    device
                );
            });
        });
    });
});
