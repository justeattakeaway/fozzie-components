import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');

const Loyalty = require('../../test-utils/component-objects/f-loyalty.component');

const loyalty = new Loyalty('organism', 'v-loyalty-component');

describe('Accessibility tests', () => {
    beforeEach(() => {
        const pageUrl = buildUrl(loyalty.componentType, loyalty.componentName, loyalty.path);
        loyalty.open(pageUrl);
        loyalty.waitForComponent();
    });
    it('a11y - should test f-loyalty component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-loyalty');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
