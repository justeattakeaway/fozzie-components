const { getAccessibilityTestResults } = require('../../../../../../../test/utils/axe-helper');
const Button = require('../../../test-utils/component-objects/f-button.component');
const button = new Button();

describe('Accessibility tests', () => {
    it('a11y - should test f-button action component WCAG compliance', () => {
        // Act
        button.open();
        button.waitForActionComponent();
        const axeResults = getAccessibilityTestResults('f-button - action');
    });

    it('a11y - should test f-button link component WCAG compliance', () => {
        // Act
        button.open('link');
        button.waitForLinkComponent();
        const axeResults = getAccessibilityTestResults('f-button - link');
    });
});
