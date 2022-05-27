const ErrorMessage = require('../../test-utils/component-objects/f-error-message.component');

const errorMessage = new ErrorMessage();

describe('f-error-message component tests', () => {
    beforeEach(async () => {
        await errorMessage.load(errorMessage.component);
    });

    it('should display the f-error-message component', async () => {
        // Assert
        await expect(await errorMessage.isComponentDisplayed()).toBe(true);
    });
});
