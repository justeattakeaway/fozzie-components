const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const Button = require('../../test-utils/component-objects/f-button.component');
const LinkButton = require('../../test-utils/component-objects/f-button--link.component');
const IconButton = require('../../test-utils/component-objects/f-button--icon.component');

let button;

describe('Accessibility tests', () => {
    it('a11y - should test f-button action component WCAG compliance', () => {
        // Arrange
        button = new Button();

        // Act
        button.load();
        const axeResults = getAccessibilityTestResults('f-button - action');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-button link component WCAG compliance', () => {
        // Arrange
        button = new LinkButton();

        // Act
        button.load();
        const axeResults = getAccessibilityTestResults('f-button - link');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-button icon component WCAG compliance', () => {
        // Arrange
        button = new IconButton();

        // Act
        button.load();
        const axeResults = getAccessibilityTestResults('f-button - icon');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
