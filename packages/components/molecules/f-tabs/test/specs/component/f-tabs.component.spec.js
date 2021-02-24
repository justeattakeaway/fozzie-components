const Tabs = require ('../../../test-utils/component-objects/f-tabs.component');
const tabs = new Tabs();

describe('f-tabs component tests', () => {
    beforeEach(() => {
        tabs.open();
        tabs.waitForComponent();
    });

    it('should display the f-tabs component', () => {
        // Assert
        expect(tabs.isComponentDisplayed()).toBe(true);
    });
});
