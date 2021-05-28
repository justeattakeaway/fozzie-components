const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const Popover = require('../../test-utils/component-objects/f-popover.component');

const popover = new Popover('atom', 'popover-component');

describe('Accessibility tests', () => {
    beforeEach(() => {
        const pageUrl = buildUrl(popover.componentType, popover.componentName, popover.path);
        popover.open(pageUrl);
        popover.waitForComponent();
    });
    it('a11y - should test f-popover component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-popover');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
