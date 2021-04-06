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

        // Assert
        expect(statusBanner.getAddress()).toEqual('');
    // do I need to add click first before error message appears?
    });

    it('should display "invalid" error when user does not input address correctly', () => {
        // Arrange
        const userInput = {
            address: '00'
        };

        // Act
        statusBanner.addAddress(userInput);

        // Assert
        expect(statusBanner.getAddress()).toEqual('');
    });

    it('should not display an error when user address is correct', () => {
        // Arrange
        const userInput = {
            address: '' // valid postcode from unit test
        };

        // Act
        statusBanner.addAddress(userInput);

        // Assert
        expect(statusBanner.getAddress()).toEqual('');
    });
});
