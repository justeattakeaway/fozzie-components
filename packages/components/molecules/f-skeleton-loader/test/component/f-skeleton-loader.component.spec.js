const SkeletonLoader = require('../../test-utils/component-objects/f-skeleton-loader.component');

const skeletonLoader = new SkeletonLoader();

describe('f-skeleton-loader component tests', () => {
    beforeEach(() => {
        skeletonLoader.load();
    });

    it('should display the f-skeleton-loader component', () => {
        // Assert
        expect(skeletonLoader.isComponentDisplayed()).toBe(true);
    });
});
