const StatusBanner = require('../../test-utils/component-objects/f-status-banner.component');

let statusBanner;

describe('f-status-banner component tests', () => {
    beforeEach(async () => {
        statusBanner = new StatusBanner();

        await statusBanner.load();
    });

    it('should display the f-statusBanner component', async () => {
        // Assert
        await expect(await statusBanner.isStatusBannerComponentDisplayed()).toBe(true);
    });
});
