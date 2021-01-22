import ButtonComponent from '../../../test-utils/component-objects/f-button.component';
import { ATOMS } from '../../../../../../../url.selectors';

describe('f-button component tests', () => {
    beforeEach(() => {
        browser.url(`${ATOMS}button-component`);
    });

    it('should display the f-button component', () => {
        // Assert
        expect(ButtonComponent.isButtonComponentDisplayed()).toBe(true);
    });
});
