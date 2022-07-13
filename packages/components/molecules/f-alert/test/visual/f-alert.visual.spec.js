import Alert from '../../test-utils/component-objects/f-alert.component';

const tests = [
    { device: 'desktop', type: 'success' },
    { device: 'desktop', type: 'warning' },
    { device: 'desktop', type: 'info' },
    { device: 'desktop', type: 'danger' },
    { device: 'mobile', type: 'success' },
    { device: 'mobile', type: 'warning' },
    { device: 'mobile', type: 'info' },
    { device: 'mobile', type: 'danger' }
];

tests.forEach(({ device, type }) => {
    describe(`f-alert - ${device} - ${type} - visual tests`, () => {
        beforeEach(async () => {
            // Arrange
            if (device === 'mobile') {
                await browser.setWindowSize(414, 731);
            }
        });

        it(`should display the f-alert (${type}) component as dismissible`, async () => {
            // Act
            await Alert.load({ type: `${type}` });

            // Assert
            await browser.percyScreenshot(`f-alert - ${type} - dismissible`, device);
        });

        it(`should display the f-alert (${type}) component as undismissible`, async () => {
            // Act
            await Alert.load({ isDismissible: false, type: `${type}` });

            // Assert
            await browser.percyScreenshot(`f-alert - ${type} - undismissible`, device);
        });
    });
});
