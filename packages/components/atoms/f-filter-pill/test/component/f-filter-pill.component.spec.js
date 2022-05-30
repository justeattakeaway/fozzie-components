const FilterPill = require('../../test-utils/component-objects/f-filter-pill.component');

const filterPill = new FilterPill();

describe('f-filter-pill component tests', () => {
    beforeEach(async () => {
        await filterPill.load(filterPill.component);
    });

    it('should display the f-filter-pill component', async () => {
        // Assert
        await expect(await filterPill.isComponentDisplayed()).toBe(true);
    });
});
