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
});
