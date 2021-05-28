const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const Button = require('../../test-utils/component-objects/f-button.component');

let button;

describe('Accessibility tests', () => {
    it('a11y - should test f-button action component WCAG compliance', () => {
        // Act
        button = new Button('atom-folder', 'f-button--button-component');
        button.withQuery('knob-Button Type', 'primary');
        button.withQuery('knob-Button Size', 'medium');
        const pageUrl = buildUrl(button.componentType, button.componentName, button.path);
        button.open(pageUrl);

        button.waitForActionComponent();
        const axeResults = getAccessibilityTestResults('f-button - action');

        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-button link component WCAG compliance', () => {
        // Act
        button = new Button('atom-folder', 'f-button--button-component');
        button.withQuery('knob-Button Type', 'link')
                .withQuery('knob-href', 'link')
                .withQuery('knob-Button Size', 'medium');

        const pageUrl = buildUrl(button.componentType, button.componentName, button.path);
        button.open(pageUrl);

        button.waitForLinkComponent();
        const axeResults = getAccessibilityTestResults('f-button - link');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
