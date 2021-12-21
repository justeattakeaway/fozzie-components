import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const FilterPill = require('../../test-utils/component-objects/f-filter-pill.component');

const filterPill = new FilterPill();

describe('Accessibility tests', () => {
    beforeEach(() => {
        filterPill.load();
    });

    it('a11y - should test f-filter-pill component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-filter-pill');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
