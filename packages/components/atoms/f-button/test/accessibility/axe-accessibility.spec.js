const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const Button = require('../../test-utils/component-objects/f-button.component');

const button = new Button('atom-folder', 'f-button--button-component');

describe('Accessibility tests', () => {
    it('a11y - should test f-button action component WCAG compliance', () => {
        // Act
        button.withQuery('knob-Button Type', 'primary');
        const pageUrl = buildUrl(button.componentType, button.componentName, button.path);
        button.open(pageUrl);
        button.waitForActionComponent();
        const axeResults = getAccessibilityTestResults('f-button - action');

        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-button link component WCAG compliance', () => {
        // Act
        button.withQuery('knob-Button Type', 'link')
        .withQuery('knob-href', 'link');
        const pageUrl = buildUrl(button.componentType, button.componentName, button.path);
        button.open(pageUrl);
        button.waitForLinkComponent();
        const axeResults = getAccessibilityTestResults('f-button - link');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
