const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const Button = require('../../test-utils/component-objects/f-button.component');
const LinkButton = require('../../test-utils/component-objects/f-button--link.component');
const IconButton = require('../../test-utils/component-objects/f-button--icon.component');

let button;

describe('Accessibility tests', () => {
    it('a11y - should test f-button action component WCAG compliance', () => {
        // Act
        button = new Button();
        button.load();

        const axeResults = getAccessibilityTestResults('f-button - action');

        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-button link component WCAG compliance', () => {
        // Act
        button = new LinkButton();

        button.load();

        const axeResults = getAccessibilityTestResults('f-button - link');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-button icon component WCAG compliance', () => {
        // Act
        button = new IconButton();

        button.load();

        const axeResults = getAccessibilityTestResults('f-button - icon');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
