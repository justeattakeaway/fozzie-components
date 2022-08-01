import <%= name.filename %> from '../../test-utils/component-objects/f-<%= name.default %>.component';

const devices = [
    'desktop',
    'mobile'
];

devices.forEach(device => {
    describe('f-<%= name.default %> - %s - Visual tests', () => {
        beforeEach(async () => {
            // Arrange
            if (device === 'mobile') {
                await browser.setWindowSize(414, 731);
            }
        });

        it('should display the f-<%= name.default %> component', async () => {
            // Act
            await <%= name.filename %>.load();

            // Assert
            await browser.percyScreenshot('f-<%= name.default %> - Visual Test', device);
        });
    });
});
