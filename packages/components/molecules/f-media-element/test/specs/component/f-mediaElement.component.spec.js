import MediaElementComponent from '../../../test-utils/component-objects/f-mediaElement.component';

describe('f-mediaElement component tests', () => {
    beforeEach(() => {
        browser.url('?path=/story/components-molecules--media-element-component');
        browser.switchToFrame(0);
        MediaElementComponent.waitForMediaElementComponent();
    });

    it('should display the f-mediaElement component', () => {
        // Assert
        expect(MediaElementComponent.isMediaElementComponentDisplayed()).toBe(true);
    });
});
