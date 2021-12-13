const MediaElement = require('../../test-utils/component-objects/f-media-element.component');

const mediaElement = new MediaElement();

describe('f-media-element component tests', () => {
    beforeEach(() => {
        mediaElement.load();
    });

    it('should display the f-media-element component', () => {
        // Assert
        expect(mediaElement.isComponentDisplayed()).toBe(true);
    });
});
