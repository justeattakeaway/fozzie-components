import FilterPill from '../../test-utils/component-objects/f-filter-pill.component';

describe('f-filter-pill component tests', () => {
    it('should display the f-filter-pill component', async () => {
        // Arrange
        await FilterPill.load();

        // Assert
        await expect(await FilterPill.isComponentDisplayed()).toBe(true);
    });
});
