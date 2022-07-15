import Offers from '../../test-utils/component-objects/f-offers.component';

describe('f-offers component tests', () => {
    beforeEach(async () => {
        await Offers.load();
    });

    // Offers not currently working in Storybook.
    it.skip('should display the f-offers component', async () => {
        // Assert
        await expect(await Offers.isComponentDisplayed()).toBe(true);
    });
});
