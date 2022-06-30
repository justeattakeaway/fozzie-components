import ActionButton from '../../test-utils/component-objects/f-button--action.component';
import LinkButton from '../../test-utils/component-objects/f-button--link.component';
import IconButton from '../../test-utils/component-objects/f-button--icon.component';

let button;

describe('Action f-button component tests', () => {
    beforeEach(() => {
        // Arrange
        // button = new ActionButton();
    });

    it('should display the f-button action component', async () => {
        // Act
        await ActionButton.load();

        // Assert
        await expect(await ActionButton.isComponentDisplayed()).toBe(true);
    });

    it('should check that the f-button action component is clickable', async () => {
        // Act
        await ActionButton.load();

        // Assert
        await expect(await ActionButton.isComponentClickable()).toBe(true);
    });
});

describe('Link f-button component tests', () => {
    beforeEach(() => {
        // Arrange
        // button = new LinkButton();
    });

    it('should display the f-button link component', async () => {
        // Act
        await LinkButton.load();

        // Assert
        await expect(await LinkButton.isComponentDisplayed()).toBe(true);
    });

    it('should check that the f-button link component is clickable', async () => {
        // Act
        await LinkButton.load();

        // Assert
        await expect(await LinkButton.isComponentClickable()).toBe(true);
    });
});

describe('Icon f-button component tests', () => {
    beforeEach(() => {
        // Arrange
        // button = new IconButton();
    });

    it('should display the f-button icon component', async () => {
        // Act
        await IconButton.load();

        // Assert
        await expect(await IconButton.isComponentDisplayed()).toBe(true);
    });

    it('should check that the f-button icon component is clickable', async () => {
        // Act
        await IconButton.load();

        // Assert
        await expect(await IconButton.isComponentClickable()).toBe(true);
    });
});
