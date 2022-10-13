import Rating from '../../test-utils/component-objects/f-rating.component';

describe('f-rating - Component tests', () => {
    it('should display the f-rating component', async () => {
        // Act
        await Rating.load();

        // Assert
        const result = await Rating.isComponentDisplayed();
        await expect(result).toBe(true);
    });
});
