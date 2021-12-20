const StatusBanner = require('../../test-utils/component-objects/f-status-banner.component');

let statusBanner;

describe('f-status-banner component tests', () => {
    beforeEach(() => {
        statusBanner = new StatusBanner();

        statusBanner.load();
    });

    it('should display the f-statusBanner component', () => {
        // Assert
        expect(statusBanner.isStatusBannerComponentDisplayed()).toBe(true);
    });
});
