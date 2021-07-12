const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const Button = require('../../test-utils/component-objects/f-button.component');

let button;

describe('f-button component tests', () => {
    it('should display the f-button action component', () => {
        // Arrange
        button = new Button('atom-folder', 'f-button--button-component');
        button.withQuery('knob-Button Type', 'primary');
        button.withQuery('knob-Button Size', 'medium');
        const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

        // Act
        button.open(pageUrl);
        button.waitForActionComponent();

        // Assert
        expect(button.isActionComponentDisplayed()).toBe(true);
    });

    it('should display the f-button link component', () => {
        // Arrange
        button = new Button('atom-folder', 'f-button--button-component');
        button.withQuery('knob-Button Type', 'link')
            .withQuery('knob-href', 'link')
            .withQuery('knob-Button Size', 'medium');

        const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

        // Act
        button.open(pageUrl);
        button.waitForLinkComponent();

        // Assert
        expect(button.isLinkComponentDisplayed()).toBe(true);
    });
});
