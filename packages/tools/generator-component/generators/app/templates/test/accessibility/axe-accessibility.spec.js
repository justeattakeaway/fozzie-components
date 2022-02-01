import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper'; // eslint-disable-line import/no-relative-packages

const <%= name.filename %> = require('../../test-utils/component-objects/f-<%= name.default %>.component');

const <%= name.class %> = new <%= name.filename %>();

describe('Accessibility tests', () => {
    beforeEach(() => {
        <%= name.class %>.load();
    });

    it('a11y - should test f-<%= name.default %> component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-<%= name.default %>');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
