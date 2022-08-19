import Mfa from '../../test-utils/component-objects/f-mfa.component';

const devices = [
    'desktop',
    'mobile'
];

const illegalCode = '123';

devices.forEach(device => {
    describe('f-mfa - Visual tests', () => {
        beforeEach(async () => {
            // Arrange
            if (device === 'mobile') {
                await browser.setWindowSize(414, 731);
            }
        });

        it('should display the f-mfa base component', async () => {
            // Act
            await Mfa.load();

            // Assert
            await browser.percyScreenshot('f-mfa - Base Component', device);
        });

        it('should display the f-mfa help page', async () => {
            // Act
            await Mfa.load();

            await Mfa.goToHelp();

            // Assert
            await browser.percyScreenshot('f-mfa - Help Page', device);
        });

        it('should display the f-mfa illegal code error on the page', async () => {
            // Act
            await Mfa.load();

            await Mfa.setFieldValue('mfaCodeInput', illegalCode);
            await Mfa.goToSubmit();

            // Assert
            await browser.percyScreenshot('f-mfa - Code Error', device);
        });

        it('should display the f-mfa load error page', async () => {
            // Act
            await Mfa.load({
                code: ''
            });

            // Assert
            await browser.percyScreenshot('f-mfa - Load Error Page', device);
        });
    });
});
