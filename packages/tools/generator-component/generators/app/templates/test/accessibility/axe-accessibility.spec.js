import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const <%= name.filename %> = require('../../test-utils/component-objects/f-<%= name.class %>.component');
const <%= name.class %> = new <%= name.filename %>

describe('Accessibility tests', () => {
    beforeEach(() => {
        <%= name.class %>.open();
        <%= name.class %>.waitForComponent();
    });
    it('a11y - should test f-<%= name.class %> component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-<%= name.class %>');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
