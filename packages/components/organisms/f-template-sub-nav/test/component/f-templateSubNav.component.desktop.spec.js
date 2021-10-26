const TemplateSubNav = require('../../test-utils/component-objects/f-templateSubNav.component');

let templateSubNav;

describe('f-templateSubNav component tests', () => {
    beforeEach(() => {
        templateSubNav = new TemplateSubNav();

        templateSubNav.load();
    });

    it('should display the f-templateSubNav component', () => {
        // Assert
        expect(templateSubNav.isComponentDisplayed()).toBe(true);
    });
});
