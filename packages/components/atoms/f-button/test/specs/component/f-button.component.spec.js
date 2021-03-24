const Button = require('../../../test-utils/component-objects/f-button.component');
const { buildUrl } = require('../../../../../../services/f-wdio-utils/src/storybook-extensions.js');

const button = new Button('atom-folder', 'f-button--button-component');

describe('f-button component tests', () => {

    it('should display the f-button action component', () => {
        // Arrange
        const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

        // Act
        button.open(pageUrl);
        button.waitForActionComponent();

        // Assert
        expect(button.isActionComponentDisplayed()).toBe(true);
    });

    it('should display the f-button link component', () => {
        // Arrange
        button.withQuery('knob-Button Type', 'link')
        .withQuery('knob-href', 'link');

        const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

        // Act
        button.open(pageUrl);
        button.waitForActionComponent();

        // Assert
        expect(button.isLinkComponentDisplayed()).toBe(true);
    });
});
