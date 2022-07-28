import Mfa from '../../test-utils/component-objects/f-mfa.component';

const devices = [
    'desktop',
    'mobile'
];

devices.forEach(device => {
    describe('f-mfa - %s - Visual tests', () => {
        beforeEach(async () => {
            // Arrange
            if (device === 'mobile') {
                await browser.setWindowSize(414, 731);
            }
        });

        it('should display the f-mfa component', async () => {
            // Act
            await Mfa.load();

            // Assert
            await browser.percyScreenshot('f-mfa - Visual Test', device);
        });
    });
});
