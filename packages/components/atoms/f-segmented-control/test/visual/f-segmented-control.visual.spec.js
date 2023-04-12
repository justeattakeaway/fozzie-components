import SegmentedControl from '../../test-utils/component-objects/f-segmented-control.component';

const devices = [
    'desktop',
    'mobile'
];

devices.forEach(device => {
    describe('f-segmented-control - %s - Visual tests', () => {
        beforeEach(async () => {
            // Arrange
            if (device === 'mobile') {
                await browser.setWindowSize(414, 731);
            }
        });

        it('should display the f-segmented-control component', async () => {
            // Act
            await SegmentedControl.load();

            // Assert
            await browser.percyScreenshot('f-segmented-control - Visual Test', device);
        });
    });
});
