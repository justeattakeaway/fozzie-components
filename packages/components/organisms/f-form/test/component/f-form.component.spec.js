const Form = require('../../test-utils/component-objects/f-form.component');

const form = new Form();

describe('f-form component tests', () => {
    beforeEach(async () => {
        await form.load();
    });

    it('should display the f-form component', async () => {
        // Assert
        await expect(await form.isComponentDisplayed()).toBe(true);
    });
});
