const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const MediaElement = require('../../test-utils/component-objects/f-mediaElement.component');

const mediaElement = new MediaElement('molecule', 'media-element-component');

describe('f-mediaElement component tests', () => {
    beforeEach(() => {
        const pageUrl = buildUrl(mediaElement.componentType, mediaElement.componentName, mediaElement.path);
        mediaElement.open(pageUrl);
        mediaElement.waitForComponent();
    });

    it('should display the f-mediaElement component', () => {
        // Assert
        expect(mediaElement.isComponentDisplayed()).toBe(true);
    });
});
