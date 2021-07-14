const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const SkeletonLoader = require('../../test-utils/component-objects/f-skeletonLoader.component');

const skeletonLoader = new SkeletonLoader('molecule', 'skeleton-loader-component');

describe('Accessibility tests', () => {
    beforeEach(() => {
        const pageUrl = buildUrl(skeletonLoader.componentType, skeletonLoader.componentName, skeletonLoader.path);
        skeletonLoader.open(pageUrl);
        skeletonLoader.waitForComponent();
    });
    it('a11y - should test f-skeletonLoader component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-skeletonLoader');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
