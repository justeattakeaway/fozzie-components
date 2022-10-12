import Rating from '../../test-utils/component-objects/f-rating.component';

const devices = [
    'desktop',
    'mobile'
];

devices.forEach(device => {
    describe('f-rating - %s - Visual tests', () => {
        beforeEach(async () => {
            // Arrange
            if (device === 'mobile') {
                await browser.setWindowSize(414, 731);
            }
        });

        it('should display the f-rating component', async () => {
            // Act
            await Rating.load();

            // Assert
            await browser.percyScreenshot('f-rating - Visual Test', device);
        });
    });
});
