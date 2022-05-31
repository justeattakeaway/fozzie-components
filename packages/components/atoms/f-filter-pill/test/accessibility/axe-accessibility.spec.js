import { getAxeResults } from '../../../../../../test/utils/axe-helper'; // eslint-disable-line import/no-relative-packages

const FilterPill = require('../../test-utils/component-objects/f-filter-pill.component');

const filterPill = new FilterPill();

describe('Accessibility tests', () => {
    beforeEach(() => {
        filterPill.load(filterPill.component);
    });

    it('a11y - should test f-filter-pill component WCAG compliance', () => {
        // Act
        const axeResults = getAxeResults('f-filter-pill');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
