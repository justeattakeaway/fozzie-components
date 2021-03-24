const StatusBanner = require('../../../test-utils/component-objects/f-statusBanner.component');
const { buildUrl } = require('../../../../../../services/f-wdio-utils/src/storybook-extensions.js');

const statusBanner = new StatusBanner('organism', 'status-banner-component');

describe('f-statusBanner component tests', () => {
    beforeEach(() => {
        const pageUrl = buildUrl(statusBanner.componentType, statusBanner.componentName, statusBanner.path);

        statusBanner.open(pageUrl)
            .waitForComponent();
    });

    it('should display the f-statusBanner component', () => {
        // Assert
        expect(statusBanner.isStatusBannerComponentDisplayed()).toBe(true);
    });
});
