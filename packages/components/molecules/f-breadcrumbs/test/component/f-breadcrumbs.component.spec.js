const Breadcrumbs = require('../../test-utils/component-objects/f-breadcrumbs.component');

const breadcrumbs = new Breadcrumbs();

describe('f-breadcrumbs component tests', () => {
    beforeEach(async () => {
        await breadcrumbs.load();
    });
    it('should display the f-breadcrumbs component', async () => {
        // Assert
        await expect(await breadcrumbs.isComponentDisplayed()).toBe(true);
    });
});
