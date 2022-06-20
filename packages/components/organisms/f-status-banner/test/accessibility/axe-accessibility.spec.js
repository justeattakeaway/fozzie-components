const { getAxeResults } = require('../../../../../../test/utils/axe-helper');

const StatusBanner = require('../../test-utils/component-objects/f-status-banner.component');

let statusBanner;

describe('Accessibility tests', () => {
    beforeEach(() => {
        statusBanner = new StatusBanner();
    });
    it('a11y - should test f-status-banner component WCAG compliance', () => {
        // Act
        statusBanner.load();
        const axeResults = getAxeResults('f-status-banner');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
