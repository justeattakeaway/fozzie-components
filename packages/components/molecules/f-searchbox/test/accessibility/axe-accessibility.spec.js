const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const Searchbox = require('../../test-utils/component-objects/f-searchbox.component');

const searchbox = new Searchbox('molecule', 'searchbox-component');

describe('Accessibility tests', () => {
    beforeEach(() => {
        const pageUrl = buildUrl(searchbox.componentType, searchbox.componentName, searchbox.path);
        searchbox.open(pageUrl);
        searchbox.waitForComponent();
    });
    it('a11y - should test f-searchbox component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-searchbox');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
