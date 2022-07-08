import StatusBanner from '../../test-utils/component-objects/f-status-banner.component';


const devices = [
    'desktop',
    'mobile'
];

devices.forEach(device => {
    describe('f-status-banner - Visual Tests', () => {
        beforeEach(async () => {
            if (device === 'mobile') {
                await browser.setWindowSize(414, 731);
            }
        });

        it('should display the f-status-banner component', async () => {
            // Act
            await StatusBanner.load();

            // Assert
            await browser.percyScreenshot('f-status-banner - Base state', device);
        });

        it('should not display an error when user address is correct', async () => {
            // Arrange
            const userInput = {
                address: 'AR511AR'
            };

            // Act
            await StatusBanner.load();
            await StatusBanner.addAddress(userInput);

            // Assert
            await browser.percyScreenshot('f-status-banner - Valid State', device);
        });

        it('should display "empty" error when user does not input address', async () => {
            // Arrange
            const userInput = {
                address: ''
            };

            // Act
            await StatusBanner.load();
            await StatusBanner.addAddress(userInput);
            await StatusBanner.clickSearchButton();

            // Assert
            await browser.percyScreenshot('f-status-banner - Empty State - Empty postcode error', device);
        });

        it('should display "invalid" error when user does not input address correctly', async () => {
            // Arrange
            const userInput = {
                address: '00'
            };

            // Act
            await StatusBanner.load();
            await StatusBanner.addAddress(userInput);
            await StatusBanner.clickSearchButton();

            // Assert
            await browser.percyScreenshot('f-status-banner - Invalid State - Invalid postcode error', device);
        });
    });
});
