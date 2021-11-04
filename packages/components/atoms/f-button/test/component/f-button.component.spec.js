const Button = require('../../test-utils/component-objects/f-button.component');
const LinkButton = require('../../test-utils/component-objects/f-button--link.component');
const IconButton = require('../../test-utils/component-objects/f-button--icon.component');

let button;

describe('f-button component tests', () => {
    it('should display the f-button action component', () => {
        // Arrange
        button = new Button();

        // Act
        button.load();

        // Assert
        expect(button.isActionComponentDisplayed()).toBe(true);
    });

    it('should display the f-button link component', () => {
        // Arrange
        button = new LinkButton();

        // Act
        button.load();

        // Assert
        expect(button.isLinkComponentDisplayed()).toBe(true);
    });

    it('should display the f-button icon component', () => {
        // Arrange
        button = new IconButton();

        // Act
        button.load();

        // Assert
        expect(button.isActionComponentDisplayed()).toBe(true);
    });
});
