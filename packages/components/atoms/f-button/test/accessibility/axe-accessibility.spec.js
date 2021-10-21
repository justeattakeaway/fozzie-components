const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const Button = require('../../test-utils/component-objects/f-button.component');

let button;

describe('Accessibility tests', () => {
    it('a11y - should test f-button action component WCAG compliance', () => {
        // Act
        button = new Button();
        button.withQuery('knob-Button Type', 'primary');
        button.withQuery('knob-Button Size', 'medium');
        button.load();
        
        const axeResults = getAccessibilityTestResults('f-button - action');

        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-button link component WCAG compliance', () => {
        // Act
        button = new Button();
        button.withQuery('knob-Button Type', 'link')
            .withQuery('knob-href', 'link')
            .withQuery('knob-Button Size', 'medium');

        button.load("link");
        
        const axeResults = getAccessibilityTestResults('f-button - link');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
