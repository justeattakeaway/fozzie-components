const Popover = require('../../test-utils/component-objects/f-popover.component');

const popover = new Popover();

describe('f-popover component tests', () => {
    beforeEach(async () => {
        await popover.load(popover.component);
    });

    it('should display the f-popover component', async () => {
        // Assert
        await expect(await popover.isComponentDisplayed()).toBe(true);
    });
});
