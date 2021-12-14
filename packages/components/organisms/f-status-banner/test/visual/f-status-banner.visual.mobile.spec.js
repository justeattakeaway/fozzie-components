const StatusBanner = require('../../test-utils/component-objects/f-status-banner.component');

let statusBanner;

describe('f-status-banner component tests', () => {
    beforeEach(() => {
        statusBanner = new StatusBanner();

        statusBanner.load();
    });

    it('should display the f-status-banner component', () => {
        // Assert
        browser.percyScreenshot('f-status-banner - Base state', 'mobile');
    });

    it('should not display an error when user address is correct', () => {
        // Arrange
        const userInput = {
            address: 'AR511AR'
        };

        // Act
        statusBanner.addAddress(userInput);

        // Assert
        browser.percyScreenshot('f-status-banner - Valid State', 'mobile');
    });

    it('should display "empty" error when user does not input address', () => {
        // Arrange
        const userInput = {
            address: ''
        };

        // Act
        statusBanner.addAddress(userInput);
        statusBanner.clickSearchButton();

        // Assert
        browser.percyScreenshot('f-status-banner - Empty State - Empty postcode error', 'mobile');
    });

    it('should display "invalid" error when user does not input address correctly', () => {
        // Arrange
        const userInput = {
            address: '00'
        };

        // Act
        statusBanner.addAddress(userInput);
        statusBanner.clickSearchButton();

        // Assert
        browser.percyScreenshot('f-status-banner - Invalid State - Invalid postcode error', 'mobile');
    });
});
