const Loyalty = require('../../test-utils/component-objects/f-loyalty.component');

describe('f-loyalty component tests', () => {
    let loyalty;
    beforeEach(async () => {
        loyalty = new Loyalty();

        await loyalty.load();
    });

    it('should display the f-loyalty component', async () => {
        // Assert
        await expect(await loyalty.isComponentDisplayed()).toBe(true);
    });
});
