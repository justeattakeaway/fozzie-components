const ErrorMessage = require('../../test-utils/component-objects/f-error-message.component');

const errorMessage = new ErrorMessage();

describe('f-error-message component tests', () => {
    beforeEach(() => {
        errorMessage.open();
        errorMessage.waitForComponent();
    });

    it('should display the f-error-message component', () => {
        // Assert
        expect(errorMessage.isComponentDisplayed()).toBe(true);
    });
});
