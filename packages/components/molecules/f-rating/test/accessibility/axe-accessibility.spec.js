import Rating from '../../test-utils/component-objects/f-rating.component';

describe('f-rating - Accessibility tests', () => {
    it('a11y - should test f-rating component WCAG compliance', async () => {
        // Act
        await Rating.load();

        // Assert
        const axeResults = await Rating.getAxeResults('f-rating');
        await expect(axeResults.violations.length).toBe(0);
    });
});
