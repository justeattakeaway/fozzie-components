const StatusBanner = require('../../test-utils/component-objects/f-status-banner.component');

let statusBanner;

describe('f-status-banner component tests', () => {
    beforeEach(async () => {
        statusBanner = new StatusBanner();
    });

    it('should display the f-statusBanner component', async () => {
        // Act
        await statusBanner.load();

        // Assert
        await expect(await statusBanner.isComponentDisplayed()).toBe(true);
    });
});
