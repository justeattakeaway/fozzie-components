import CardWithContent from '../../test-utils/component-objects/f-card-with-content.component';

describe('f-card-with-content component tests', () => {
    it('should display the f-card-with-content component', async () => {
        // Act
        await CardWithContent.load();

        // Assert
        await expect(await CardWithContent.isComponentDisplayed()).toBe(true);
    });
});
