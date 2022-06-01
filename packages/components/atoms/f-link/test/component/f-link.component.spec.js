const Link = require('../../test-utils/component-objects/f-link.component');

const link = new Link();

describe('f-link component tests', () => {
    beforeEach(async () => {
        await link.load(link.component);
    });

    it('should display the f-link component', async () => {
        // Assert
        await expect(await link.isComponentDisplayed()).toBe(true);
    });
});
