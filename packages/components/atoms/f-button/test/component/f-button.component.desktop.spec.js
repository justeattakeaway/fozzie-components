const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const Button = require('../../test-utils/component-objects/f-button.component');

let button;

describe('f-button component tests', () => {
    it('should display the f-button action component', () => {
        // Arrange
        button = new Button();
        button.withQuery('knob-Button Type', 'primary');
        button.withQuery('knob-Button Size', 'medium');

        // Act
        button.load();

        // Assert
        expect(button.isActionComponentDisplayed()).toBe(true);
    });

    it('should display the f-button link component', () => {
        // Arrange
        button = new Button();
        button.withQuery('knob-Button Type', 'link')
            .withQuery('knob-href', 'link')
            .withQuery('knob-Button Size', 'medium');

        // Act
        button.load('link');

        // Assert
        expect(button.isLinkComponentDisplayed()).toBe(true);
    });
});
