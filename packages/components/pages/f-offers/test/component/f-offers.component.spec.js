const Offers = require('../../test-utils/component-objects/f-offers.component');

describe('f-offers component tests', () => {
    let offers;
    beforeEach(() => {
        offers = new Offers();

        offers.load();
    });

    it('should display the f-offers component', () => {
        // Assert
        expect(offers.isComponentDisplayed()).toBe(true);
    });
});
