import Loyalty from '../../test-utils/component-objects/f-loyalty.component';

describe('f-loyalty component tests', () => {
    beforeEach(async () => {
        await Loyalty.load();
    });

    it('should display the f-loyalty component', async () => {
        // Assert
        await expect(await Loyalty.isComponentDisplayed()).toBe(true);
    });
});
