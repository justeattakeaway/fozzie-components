const Form = require('../../test-utils/component-objects/f-form.component');

const form = new Form();

describe('f-form component tests', () => {
    beforeEach(() => {
        form.load();
    });

    it('should display the f-form component', () => {
        // Assert
        expect(form.isComponentDisplayed()).toBe(true);
    });
});
