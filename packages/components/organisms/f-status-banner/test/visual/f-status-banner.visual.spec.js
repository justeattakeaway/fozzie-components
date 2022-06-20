import forEach from 'mocha-each';

const StatusBanner = require('../../test-utils/component-objects/f-status-banner.component');

let statusBanner;

forEach(['desktop', 'mobile'])
.describe('f-status-banner - Visual Tests', device => {
    beforeEach(() => {
        statusBanner = new StatusBanner();
    });

    beforeEach(() => {
        if (device === 'mobile') {
            browser.setWindowSize(414, 731);
        }

        statusBanner = new StatusBanner();
    });

    it('should display the f-status-banner component', async () => {
        // Act
        await statusBanner.load();

        // Assert
        await browser.percyScreenshot('f-status-banner - Base state', device);
    });

    it('should not display an error when user address is correct', async () => {
        // Arrange
        const userInput = {
            address: 'AR511AR'
        };

        // Act
        await statusBanner.load();
        await statusBanner.addAddress(userInput);

        // Assert
        await browser.percyScreenshot('f-status-banner - Valid State', device);
    });

    it('should display "empty" error when user does not input address', async () => {
        // Arrange
        const userInput = {
            address: ''
        };

        // Act
        await statusBanner.load();
        await statusBanner.addAddress(userInput);
        await statusBanner.clickSearchButton();

        // Assert
        await browser.percyScreenshot('f-status-banner - Empty State - Empty postcode error', device);
    });

    it('should display "invalid" error when user does not input address correctly', async () => {
        // Arrange
        const userInput = {
            address: '00'
        };

        // Act
        await statusBanner.load();
        await statusBanner.addAddress(userInput);
        await statusBanner.clickSearchButton();

        // Assert
        await browser.percyScreenshot('f-status-banner - Invalid State - Invalid postcode error', device);
    });
});
