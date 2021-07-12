const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const StatusBanner = require('../../test-utils/component-objects/f-statusBanner.component');

let statusBanner;

describe('Accessibility tests', () => {
    beforeEach(() => {
        statusBanner = new StatusBanner('organism', 'status-banner-component');
        const pageUrl = buildUrl(statusBanner.componentType, statusBanner.componentName, statusBanner.path);
        statusBanner.open(pageUrl);
        statusBanner.waitForComponent();
    });
    it('a11y - should test f-statusBanner component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-statusBanner');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
