const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const SkeletonLoader = require('../../test-utils/component-objects/f-skeleton-loader.component');

const skeletonLoader = new SkeletonLoader();

describe('Accessibility tests', () => {
    beforeEach(() => {
        skeletonLoader.load();
    });
    it('a11y - should test f-skeleton-loader component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-skeleton-loader');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
