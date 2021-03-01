const { getAccessibilityTestResults } = require('../../../../../../../test/utils/axe-helper');
const Button = require('../../../test-utils/component-objects/f-button.component');
const button = new Button();

describe('Accessibility tests', () => {
    beforeEach(() => {
        button.open();
        button.waitForComponent();
    });

    it('a11y - should test f-button component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-button');
    });
});
