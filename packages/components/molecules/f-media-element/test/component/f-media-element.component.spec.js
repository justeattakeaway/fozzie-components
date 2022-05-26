const MediaElement = require('../../test-utils/component-objects/f-media-element.component');

const mediaElement = new MediaElement();

describe('f-media-element component tests', () => {
    beforeEach(async () => {
        await mediaElement.load();
    });

    it('should display the f-media-element component', async () => {
        // Assert
        await expect(await mediaElement.isComponentDisplayed()).toBe(true);
    });
});
