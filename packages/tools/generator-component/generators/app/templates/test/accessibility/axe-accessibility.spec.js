import { getAxeResults } from '../../../../../../test/utils/axe-helper'; // eslint-disable-line import/no-relative-packages

const <%= name.filename %> = require('../../test-utils/component-objects/f-<%= name.default %>.component');

let <%= name.class %>;

describe('Accessibility tests', () => {
    beforeEach(() => {
        <%= name.class %> = new <%= name.filename %>();
        <%= name.class %>.load();
    });

    it('a11y - should test f-<%= name.default %> component WCAG compliance', () => {
        // Act
        const axeResults = getAxeResults('f-<%= name.default %>');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
