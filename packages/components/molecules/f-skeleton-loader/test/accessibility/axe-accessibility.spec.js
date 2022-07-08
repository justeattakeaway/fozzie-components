import SkeletonLoader from '../../test-utils/component-objects/f-skeleton-loader.component';

describe('Accessibility tests', () => {
    it('a11y - should test f-skeleton-loader component WCAG compliance', async () => {
        // Act
        await SkeletonLoader.load();
        const axeResults = await SkeletonLoader.getAxeResults('f-skeleton-loader');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
