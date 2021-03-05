const { getAccessibilityTestResults } = require('../../../../../../../test/utils/axe-helper');
const Header = require('../../../test-utils/component-objects/f-header.component');
const header = new Header();

describe('Accessibility tests', () => {
    beforeEach(() => {
        header.open();
        header.waitForComponent();
    });

    it('a11y - should test f-header component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-header');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
