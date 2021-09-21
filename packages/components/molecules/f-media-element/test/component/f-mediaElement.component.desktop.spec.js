const MediaElement = require('../../test-utils/component-objects/f-mediaElement.component');

const mediaElement = new MediaElement();

describe('f-mediaElement component tests', () => {
    beforeEach(() => {
        mediaElement.load();
    });

    it('should display the f-mediaElement component', () => {
        // Assert
        expect(mediaElement.isComponentDisplayed()).toBe(true);
    });
});
