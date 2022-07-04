import Card from '../../test-utils/component-objects/f-card.component';

describe('f-card component tests', () => {
    it('should display the f-card component', async () => {
        // Arrange
        await Card.load();
        
        // Assert
        await expect(await Card.isComponentDisplayed()).toBe(true);
    });
});
