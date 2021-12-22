const FilterPill = require('../../test-utils/component-objects/f-filter-pill.component');

const filterPill = new FilterPill();

describe('f-filter-pill component tests', () => {
    beforeEach(() => {
        filterPill.load();
    });

    it('should display the f-filter-pill component', () => {
        // Assert
        expect(filterPill.isComponentDisplayed()).toBe(true);
    });
});
