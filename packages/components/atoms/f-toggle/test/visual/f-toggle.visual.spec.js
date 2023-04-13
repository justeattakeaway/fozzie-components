import Toggle from '../../test-utils/component-objects/f-toggle.component';

const devices = [
    'desktop',
    'mobile'
];

devices.forEach(device => {
    describe('f-toggle - %s - Visual tests', () => {
        beforeEach(async () => {
            // Arrange
            if (device === 'mobile') {
                await browser.setWindowSize(414, 731);
            }
        });

        it('should display the f-toggle component', async () => {
            // Act
            await Toggle.load();

            // Assert
            await browser.percyScreenshot('f-toggle - Visual Test', device);
        });
    });
});
