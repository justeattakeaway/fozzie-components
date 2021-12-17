const ActionButton = require('../../test-utils/component-objects/f-button--action.component');
const LinkButton = require('../../test-utils/component-objects/f-button--link.component');
const IconButton = require('../../test-utils/component-objects/f-button--icon.component');

let button;

describe('f-button component tests', () => {
    it('should display the f-button action component', () => {
        // Arrange
        button = new ActionButton();

        // Act
        button.load();

        // Assert
        expect(button.isComponentDisplayed()).toBe(true);
    });

    it('should check that the f-button action component is clickable', () => {
        // Arrange
        button = new ActionButton();

        // Act
        button.load();

        // Assert
        expect(button.isComponentClickable()).toBe(true);
    });

    it('should display the f-button link component', () => {
        // Arrange
        button = new LinkButton();

        // Act
        button.load();

        // Assert
        expect(button.isComponentDisplayed()).toBe(true);
    });

    it('should check that the f-button link component is clickable', () => {
        // Arrange
        button = new LinkButton();

        // Act
        button.load();

        // Assert
        expect(button.isComponentClickable()).toBe(true);
    });

    it('should display the f-button icon component', () => {
        // Arrange
        button = new IconButton();

        // Act
        button.load();

        // Assert
        expect(button.isComponentDisplayed()).toBe(true);
    });

    it('should check that the f-button icon component is clickable', () => {
        // Arrange
        button = new IconButton();

        // Act
        button.load();

        // Assert
        expect(button.isComponentClickable()).toBe(true);
    });
});
