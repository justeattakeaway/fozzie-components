const { getAxeResults } = require('../../../../../../test/utils/axe-helper');

const SkeletonLoader = require('../../test-utils/component-objects/f-skeleton-loader.component');

const skeletonLoader = new SkeletonLoader();

describe('Accessibility tests', () => {
    beforeEach(async () => {
        await skeletonLoader.load();
    });
    it('a11y - should test f-skeleton-loader component WCAG compliance', () => {
        // Act
        const axeResults = getAxeResults('f-skeleton-loader');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
