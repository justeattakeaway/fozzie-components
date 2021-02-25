const Button = require('../../../test-utils/component-objects/f-button.component');
const button = new Button();

describe('f-button component tests', () => {
    beforeEach(() => {
        button.open();
        button.waitForComponent();
    });

    it('should display the f-button component', () => {
        // Assert
        expect(button.isComponentDisplayed()).toBe(true);
    });
});
