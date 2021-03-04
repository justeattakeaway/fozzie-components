const Popover = require ('../../../test-utils/component-objects/f-popover.component');
const popover = new Popover();

describe('f-popover component tests', () => {
    beforeEach(() => {
        popover.open();
        popover.waitForComponent();
    });

    it('should display the f-popover component', () => {
        // Assert
        expect(popover.isComponentDisplayed()).toBe(true);
    });
});
