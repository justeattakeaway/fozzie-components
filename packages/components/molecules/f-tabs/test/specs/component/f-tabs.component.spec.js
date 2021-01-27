import TabsComponent from '../../../test-utils/component-objects/f-tabs.component';

describe('f-tabs component tests', () => {
    beforeEach(() => {
        browser.url('?path=/story/components--vue-tabs-component');
        browser.switchToFrame(0);
        TabsComponent.waitForTabsComponent();
    });
    it('should display the f-tabs component', () => {
        // Assert
        expect(TabsComponent.isTabsComponentDisplayed()).toBe(true);
    });
});
