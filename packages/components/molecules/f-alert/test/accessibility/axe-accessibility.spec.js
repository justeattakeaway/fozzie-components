const { getAxeResults } = require('../../../../../../test/utils/axe-helper');
const Alert = require('../../test-utils/component-objects/f-alert.component');

const alert = new Alert();

describe('Accessibility tests', () => {
    beforeEach(() => {
        alert.load();
    });

    it('a11y - should test f-alert component WCAG compliance', () => {
        // Act
        const axeResults = getAxeResults('f-alert');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
