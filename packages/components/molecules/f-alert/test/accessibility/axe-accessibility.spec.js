const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');
const Alert = require('../../test-utils/component-objects/f-alert.component');

const alert = new Alert('molecule', 'alert-component');

describe('Accessibility tests', () => {
    beforeEach(() => {
        const pageUrl = buildUrl(alert.componentType, alert.componentName, alert.path);
        alert.open(pageUrl);
        alert.waitForComponent();
    });

    it('a11y - should test f-alert component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-alert');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
