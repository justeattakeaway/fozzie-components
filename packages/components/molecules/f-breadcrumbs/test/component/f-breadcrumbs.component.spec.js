const Breadcrumbs = require('../../test-utils/component-objects/f-breadcrumbs.component');

let breadcrumbs;

describe('f-breadcrumbs component tests', () => {
    beforeEach(async () => {
        breadcrumbs = new Breadcrumbs();
        await breadcrumbs.load();
    });

    it('should display the f-breadcrumbs component', async () => {
        // Assert
        const result = await breadcrumbs.isComponentDisplayed();

        expect(result).toBe(true);
    });
});
