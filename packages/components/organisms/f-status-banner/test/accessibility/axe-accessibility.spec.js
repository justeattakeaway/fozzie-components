const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const StatusBanner = require('../../test-utils/component-objects/f-statusBanner.component');

const statusBanner = new StatusBanner();

describe('Accessibility tests', () => {
    beforeEach(() => {
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
