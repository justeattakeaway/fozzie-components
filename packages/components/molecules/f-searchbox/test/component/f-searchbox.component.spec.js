const Searchbox = require('../../test-utils/component-objects/f-searchbox.component');

const searchbox = new Searchbox();

describe('f-searchbox component tests', () => {
    beforeEach(async () => {
        await searchbox.load();
    });

    it('should display the f-searchbox component', async () => {
        // Assert
        await expect(await searchbox.isComponentDisplayed()).toBe(true);
    });
});
