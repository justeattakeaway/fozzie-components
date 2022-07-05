import Link from '../../test-utils/component-objects/f-link.component';

describe('f-link component tests', () => {
    it('should display the f-link component', async () => {
        // Arrange
        await Link.load();

        // Assert
        await expect(await Link.isComponentDisplayed()).toBe(true);
    });
});
