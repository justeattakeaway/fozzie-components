const Offers = require('../../test-utils/component-objects/f-offers.component');

describe('f-offers component tests', () => {
    let offers;
    beforeEach(async () => {
        offers = new Offers();

        await offers.load();
    });

    it('should display the f-offers component', async () => {
        // Assert
        await expect(await offers.isComponentDisplayed()).toBe(true);
    });
});
