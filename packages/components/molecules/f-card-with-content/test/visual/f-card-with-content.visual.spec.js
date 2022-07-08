import CardWithContent from '../../test-utils/component-objects/f-card-with-content.component';

const devices = [
    'desktop',
    'mobile'
];

devices.forEach(device => {
    describe(`f-card-with-content - ${device} Visual Tests`, () => {
        beforeEach(async () => {
            // Arrange
            if (device === 'mobile') {
                await browser.setWindowSize(414, 731);
            }
        });

        it('should display default component state', async () => {
            // Act
            await CardWithContent.load();

            // Assert
            browser.percyScreenshot('f-card-with-content - Base State', device);
        });
    });
});
