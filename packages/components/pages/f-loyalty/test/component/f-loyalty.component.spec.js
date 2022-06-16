const Loyalty = require('../../test-utils/component-objects/f-loyalty.component');

describe('f-loyalty component tests', () => {
    let loyalty;
    beforeEach(() => {
        loyalty = new Loyalty();

        loyalty.load();
    });

    it('should display the f-loyalty component', () => {
        // Assert
        expect(loyalty.isComponentDisplayed()).toBe(true);
    });
});
