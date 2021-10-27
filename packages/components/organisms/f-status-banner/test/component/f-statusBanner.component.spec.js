const StatusBanner = require('../../test-utils/component-objects/f-statusBanner.component');

let statusBanner;

describe('f-statusBanner component tests', () => {
    beforeEach(() => {
        statusBanner = new StatusBanner();

        statusBanner.load();
    });

    it('should display the f-statusBanner component', () => {
        // Assert
        expect(statusBanner.isStatusBannerComponentDisplayed()).toBe(true);
    });
});
