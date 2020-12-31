import ButtonComponent from '../../../test-utils/component-objects/f-button.component';

describe('f-button component tests', () => {
    beforeEach(() => {
        browser.url('?path=/story/components-atoms--button-component');
        browser.switchToFrame(0);
        ButtonComponent.waitForButtonComponent();
    });

    it('should display the f-button component', () => {
        // Assert
        expect(ButtonComponent.isButtonComponentDisplayed()).toBe(true);
    });
});
