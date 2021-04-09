const StatusBanner = require('../../../test-utils/component-objects/f-statusBanner.component');
const statusBanner = new StatusBanner();

describe('f-statusBanner component tests', () => {
    beforeEach(() => {
        statusBanner.open();
        statusBanner.waitForComponent();
    });

    it('should display the f-statusBanner component', () => {
        // Assert
        expect(statusBanner.isStatusBannerComponentDisplayed()).toBe(true);
    });

    it('should display image and headings of the status-banner', () => {
        // Assert
        expect(statusBanner.isImageDisplayed()).toBe(true);
        expect(statusBanner.isHeadingDisplayed()).toBe(true);
        expect(statusBanner.isSubheadingDisplayed()).toBe(true);
    });

    it('should display address box and search button', () => {
        // Assert
        expect(statusBanner.isAddressBoxDisplayed()).toBe(true);
        expect(statusBanner.isSearchButtonDisplayed()).toBe(true);
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
        expect(statusBanner.getErrorMessage()).toContain('enter a postcode');
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
        expect(statusBanner.getErrorMessage()).toContain('enter a full, valid postcode');
    });

    it('should not display an error when user address is correct', () => {
        // Arrange
        const userInput = {
            address: 'AR511AR'
        };

        // Act
        statusBanner.addAddress(userInput);
        statusBanner.clickSearchButton();

        // Assert
        expect(statusBanner.isErrorMessageDisplayed()).toBe(false);
    });
});
