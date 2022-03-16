const { getAxeResults } = require('../../../../../../test/utils/axe-helper');

const Searchbox = require('../../test-utils/component-objects/f-searchbox.component');

const searchbox = new Searchbox();

describe('Accessibility tests', () => {
    beforeEach(() => {
        searchbox.load();
    });
    it('a11y - should test f-searchbox component WCAG compliance', () => {
        // Act
        const axeResults = getAxeResults('f-searchbox');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
