import ButtonComponent from '../../../test-utils/component-objects/f-button.component';

describe('f-button component tests', () => {
    beforeEach(() => {
        browser.url('iframe.html?id=components-atoms--button-component');
        ButtonComponent.waitForButtonComponent();
    });

    it('should display the f-button component', () => {
        // Assert
        expect(ButtonComponent.isButtonComponentDisplayed()).toBe(true);
    });
});
