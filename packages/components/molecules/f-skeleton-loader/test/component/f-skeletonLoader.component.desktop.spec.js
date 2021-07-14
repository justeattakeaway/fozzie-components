const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const SkeletonLoader = require('../../test-utils/component-objects/f-skeletonLoader.component');

const skeletonLoader = new SkeletonLoader('molecule', 'skeleton-loader-component');

describe('f-skeletonLoader component tests', () => {
    beforeEach(() => {
        const pageUrl = buildUrl(skeletonLoader.componentType, skeletonLoader.componentName, skeletonLoader.path);
        skeletonLoader.open(pageUrl);
        skeletonLoader.waitForComponent();
    });

    it('should display the f-skeletonLoader component', () => {
        // Assert
        expect(skeletonLoader.isComponentDisplayed()).toBe(true);
    });
});
