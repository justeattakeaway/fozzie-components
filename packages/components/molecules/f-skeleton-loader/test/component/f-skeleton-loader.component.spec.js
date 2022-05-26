const SkeletonLoader = require('../../test-utils/component-objects/f-skeleton-loader.component');

const skeletonLoader = new SkeletonLoader();

describe('f-skeleton-loader component tests', () => {
    beforeEach(async () => {
        await skeletonLoader.load();
    });

    it('should display the f-skeleton-loader component', async () => {
        // Assert
        await expect(await skeletonLoader.isComponentDisplayed()).toBe(true);
    });
});
