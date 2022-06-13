import { getAxeResults } from '../../../../../../test/utils/axe-helper'; // eslint-disable-line import/no-relative-packages

const <%= name.filename %> = require('../../test-utils/component-objects/f-<%= name.default %>.component');

describe('f-<%= name.default %> - Accessibility tests', () => {
    let <%= name.class %>;

    beforeEach(() => {
        <%= name.class %> = new <%= name.filename %>();
    });

    it('a11y - should test f-<%= name.default %> component WCAG compliance', () => {
        // Act
        <%= name.class %>.load();

        // Assert
        const axeResults = getAxeResults('f-<%= name.default %>');
        expect(axeResults.violations.length).toBe(0);
    });
});
