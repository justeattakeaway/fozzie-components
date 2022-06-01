const StatusBanner = require('../../test-utils/component-objects/f-status-banner.component');

let statusBanner;

describe('f-status-banner component tests', () => {
    beforeEach(async () => {
        statusBanner = new StatusBanner();

        await statusBanner.load();
    });

    it('should display the f-status-banner component', async () => {
        // Assert
        await browser.percyScreenshot('f-status-banner - Base state', 'desktop');
    });

    it('should not display an error when user address is correct', async () => {
        // Arrange
        const userInput = {
            address: 'AR511AR'
        };

        // Act
        await statusBanner.addAddress(userInput);

        // Assert
        await browser.percyScreenshot('f-status-banner - Valid State', 'desktop');
    });

    it('should display "empty" error when user does not input address', async () => {
        // Arrange
        const userInput = {
            address: ''
        };

        // Act
        await statusBanner.addAddress(userInput);
        await statusBanner.clickSearchButton();

        // Assert
        await browser.percyScreenshot('f-status-banner - Empty State - Empty postcode error', 'desktop');
    });

    it('should display "invalid" error when user does not input address correctly', async () => {
        // Arrange
        const userInput = {
            address: '00'
        };

        // Act
        await statusBanner.addAddress(userInput);
        await statusBanner.clickSearchButton();

        // Assert
        await browser.percyScreenshot('f-status-banner - Invalid State - Invalid postcode error', 'desktop');
    });
});
