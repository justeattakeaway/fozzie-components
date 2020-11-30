import ButtonComponent from '../../../test-utils/component-objects/f-button.component';

describe('f-button component tests', () => {
    it('should display the f-button component', () => {
        // Assert
        expect(ButtonComponent.isButtonComponentDisplayed()).toBe(true);
    });
});
