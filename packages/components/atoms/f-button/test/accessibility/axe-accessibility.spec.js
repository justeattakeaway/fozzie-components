const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const Button = require('../../test-utils/component-objects/f-button.component');

let button = new Button();

describe('Accessibility tests', () => {
    it('a11y - should test f-button action component WCAG compliance', () => {
        // Act
        button.load( {
            'Button Type': 'primary',
            'Button Size': 'medium',
        });
        
        const axeResults = getAccessibilityTestResults('f-button - action');

        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-button link component WCAG compliance', () => {
        // Act
        button.loadLink({
            'Button Type': 'link',
            'href': 'link',
            'Button Size': 'medium',
        });
        
        const axeResults = getAccessibilityTestResults('f-button - link');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
