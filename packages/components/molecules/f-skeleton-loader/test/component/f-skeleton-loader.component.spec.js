import SkeletonLoader from '../../test-utils/component-objects/f-skeleton-loader.component';

describe('f-skeleton-loader component tests', () => {
    it('should display the f-skeleton-loader component', async () => {
        // Act
        await SkeletonLoader.load();

        // Assert
        await expect(await SkeletonLoader.isComponentDisplayed()).toBe(true);
    });
});
