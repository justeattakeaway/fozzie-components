import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const SkeletonLoader = require('../../test-utils/component-objects/f-skeletonLoader.component');

const skeletonLoader = new SkeletonLoader();

describe('Accessibility tests', () => {
    beforeEach(() => {
        skeletonLoader.open();
        skeletonLoader.waitForComponent();
    });
    it('a11y - should test f-skeletonLoader component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-skeletonLoader');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
