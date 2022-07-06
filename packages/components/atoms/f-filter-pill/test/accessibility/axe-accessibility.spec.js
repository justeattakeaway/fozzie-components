import FilterPill from '../../test-utils/component-objects/f-filter-pill.component';

describe('Accessibility tests', () => {
    it('a11y - should test f-filter-pill component WCAG compliance', async () => {
        // Arrange
        await FilterPill.load();

        // Act
        const axeResults = await FilterPill.getAxeResults('f-filter-pill');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
