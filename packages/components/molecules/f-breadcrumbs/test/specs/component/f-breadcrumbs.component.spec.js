const Breadcrumbs = require('../../../test-utils/component-objects/f-breadcrumbs.component');
const breadcrumbs = new Breadcrumbs();

describe('f-breadcrumbs component tests', () => {
    beforeEach(() => {
        breadcrumbs.open();
        breadcrumbs.waitForComponent();
    });
    it('should display the f-breadcrumbs component', () => {
        // Assert
        expect(breadcrumbs.isComponentDisplayed()).toBe(true);
    });
});
