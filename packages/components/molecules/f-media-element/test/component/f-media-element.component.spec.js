const MediaElement = require('../../test-utils/component-objects/f-media-element.component');

let mediaElement;

describe('f-media-element component tests', () => {
    beforeEach(async () => {
        mediaElement = new MediaElement();
    });

    it('should display the f-media-element component', async () => {
        // Arrange
        await mediaElement.load();
        const result = await mediaElement.isComponentDisplayed();

        // Assert
        await expect(result).toBe(true);
    });
});
