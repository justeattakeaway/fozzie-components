const { getAxeResults } = require('../../../../../../test/utils/axe-helper');

const Tabs = require('../../test-utils/component-objects/f-tabs.component');

const tabs = new Tabs();

describe('Accessibility tests', () => {
    beforeEach(async () => {
        await tabs.load();
    });
    it('a11y - should test f-tabs component WCAG compliance', () => {
        // Act
        const axeResults = getAxeResults('f-tabs');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
