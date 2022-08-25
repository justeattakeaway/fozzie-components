import ActionButton from '../../test-utils/component-objects/f-button--action.component';
import LinkButton from '../../test-utils/component-objects/f-button--link.component';
import IconButton from '../../test-utils/component-objects/f-button--icon.component';

describe('Action f-button component tests', () => {
    it('should display the f-button action component', async () => {
        // Act
        await ActionButton.load();

        // Assert
        await expect(await ActionButton.isComponentDisplayed()).toBe(false);
    });

    it('should check that the f-button action component is clickable', async () => {
        // Act
        await ActionButton.load();

        // Assert
        await expect(await ActionButton.isComponentClickable()).toBe(false);
    });
});

describe('Link f-button component tests', () => {
    it('should display the f-button link component', async () => {
        // Act
        await LinkButton.load();

        // Assert
        await expect(await LinkButton.isComponentDisplayed()).toBe(false);
    });

    it('should check that the f-button link component is clickable', async () => {
        // Act
        await LinkButton.load();

        // Assert
        await expect(await LinkButton.isComponentClickable()).toBe(false);
    });
});

describe('Icon f-button component tests', () => {
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
