import MediaElement from '../../test-utils/component-objects/f-media-element.component';

describe('f-media-element component tests', () => {
    it('should display the f-media-element component', async () => {
        // Act
        await MediaElement.load();

        // Assert
        await expect(await MediaElement.isComponentDisplayed()).toBe(true);
    });
});
