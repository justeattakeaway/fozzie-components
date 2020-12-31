import SearchboxComponent from '../../../test-utils/component-objects/f-searchbox.component';

describe('f-searchbox component tests', () => {
    beforeEach(() => {
        browser.url('?path=/story/components--vue-searchbox-component');
        browser.switchToFrame(0);
        SearchboxComponent.waitForSearchboxComponent();
    });

    it.skip('should display the f-searchbox component', () => {
        // Assert
        expect(SearchboxComponent.isSearchboxComponentDisplayed()).toBe(true);
    });
});
