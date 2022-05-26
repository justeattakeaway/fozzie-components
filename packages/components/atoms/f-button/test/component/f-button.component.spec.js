const ActionButton = require('../../test-utils/component-objects/f-button--action.component');
const LinkButton = require('../../test-utils/component-objects/f-button--link.component');
const IconButton = require('../../test-utils/component-objects/f-button--icon.component');

let button;

describe('f-button component tests', () => {
    it('should display the f-button action component', async () => {
        // Arrange
        button = new ActionButton();

        // Act
        await button.load();

        // Assert
        await expect(await button.isComponentDisplayed()).toBe(true);
    });

    it('should check that the f-button action component is clickable', async () => {
        // Arrange
        button = new ActionButton();

        // Act
        await button.load();

        // Assert
        await expect(await button.isComponentClickable()).toBe(true);
    });

    it('should display the f-button link component', async () => {
        // Arrange
        button = new LinkButton();

        // Act
        await button.load();

        // Assert
        await expect(await button.isComponentDisplayed()).toBe(true);
    });

    it('should check that the f-button link component is clickable', async () => {
        // Arrange
        button = new LinkButton();

        // Act
        await button.load();

        // Assert
        await expect(await button.isComponentClickable()).toBe(true);
    });

    it('should display the f-button icon component', async () => {
        // Arrange
        button = new IconButton();

        // Act
        await button.load();

        // Assert
        await expect(await button.isComponentDisplayed()).toBe(true);
    });

    it('should check that the f-button icon component is clickable', async () => {
        // Arrange
        button = new IconButton();

        // Act
        await button.load();

        // Assert
        await expect(await button.isComponentClickable()).toBe(true);
    });
});
