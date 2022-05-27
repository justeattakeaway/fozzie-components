const { getAxeResults } = require('../../../../../../test/utils/axe-helper');

const Popover = require('../../test-utils/component-objects/f-popover.component');

const popover = new Popover();

describe('Accessibility tests', () => {
    beforeEach(() => {
        popover.load(popover.component);
    });
    it('a11y - should test f-popover component WCAG compliance', () => {
        // Act
        const axeResults = getAxeResults('f-popover');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
