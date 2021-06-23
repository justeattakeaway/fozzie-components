const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');

const StatusBanner = require('../../test-utils/component-objects/f-statusBanner.component');

let statusBanner;

describe('f-statusBanner component tests', () => {
    beforeEach(() => {
        statusBanner = new StatusBanner('organism', 'status-banner-component');
        const pageUrl = buildUrl(statusBanner.componentType, statusBanner.componentName, statusBanner.path);

        statusBanner.open(pageUrl);
        statusBanner.waitForComponent();
    });

    it('should display the f-statusBanner component', () => {
        // Assert
        browser.percyScreenshot('f-status-banner - Base state', 'desktop');
    });

    it('should not display an error when user address is correct', () => {
        // Arrange
        const userInput = {
            address: 'AR511AR'
        };

        // Act
        statusBanner.addAddress(userInput);

        // Assert
        browser.percyScreenshot('f-status-banner - Valid State', 'desktop');
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
        browser.percyScreenshot('f-status-banner - Empty State - Empty postcode error', 'desktop');
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
        browser.percyScreenshot('f-status-banner - Invalid State - Invalid postcode error', 'desktop');
    });
});
