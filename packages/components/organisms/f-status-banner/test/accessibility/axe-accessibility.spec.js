const { getAxeResults } = require('../../../../../../test/utils/axe-helper');

const StatusBanner = require('../../test-utils/component-objects/f-status-banner.component');

let statusBanner;

describe('Accessibility tests', () => {
    beforeEach(() => {
        statusBanner = new StatusBanner();
        statusBanner.load();
    });
    it('a11y - should test f-status-banner component WCAG compliance', () => {
        // Act
        const axeResults = getAxeResults('f-status-banner');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
