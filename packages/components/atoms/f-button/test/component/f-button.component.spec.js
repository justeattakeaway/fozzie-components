const ActionButton = require('../../test-utils/component-objects/f-button--action.component');
const LinkButton = require('../../test-utils/component-objects/f-button--link.component');
const IconButton = require('../../test-utils/component-objects/f-button--icon.component');

let button;

describe('Action f-button component tests', () => {
    beforeEach(() => {
        // Arrange
        button = new ActionButton();
    });

    it('should display the f-button action component', async () => {
        // Act
        await button.load();

        // Assert
        await expect(await button.isComponentDisplayed()).toBe(true);
    });

    it('should check that the f-button action component is clickable', async () => {
        // Act
        await button.load();

        // Assert
        await expect(await button.isComponentClickable()).toBe(true);
    });
});

describe('Link f-button component tests', () => {
    beforeEach(() => {
        // Arrange
        button = new LinkButton();
    });

    it('should display the f-button link component', async () => {
        // Act
        await button.load();

        // Assert
        await expect(await button.isComponentDisplayed()).toBe(true);
    });

    it('should check that the f-button link component is clickable', async () => {
        // Act
        await button.load();

        // Assert
        await expect(await button.isComponentClickable()).toBe(true);
    });
});

describe('Icon f-button component tests', () => {
    beforeEach(() => {
        // Arrange
        button = new IconButton();
    });

    it('should display the f-button icon component', async () => {
        // Act
        await button.load();

        // Assert
        await expect(await button.isComponentDisplayed()).toBe(true);
    });

    it('should check that the f-button icon component is clickable', async () => {
        // Act
        await button.load();

        // Assert
        await expect(await button.isComponentClickable()).toBe(true);
    });
});
