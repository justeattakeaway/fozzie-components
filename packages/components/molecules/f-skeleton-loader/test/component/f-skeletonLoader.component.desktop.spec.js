const SkeletonLoader = require('../../test-utils/component-objects/f-skeletonLoader.component');

const skeletonLoader = new SkeletonLoader();

describe('f-skeletonLoader component tests', () => {
    beforeEach(() => {
        skeletonLoader.load();
    });

    it('should display the f-skeletonLoader component', () => {
        // Assert
        expect(skeletonLoader.isComponentDisplayed()).toBe(true);
    });
});
