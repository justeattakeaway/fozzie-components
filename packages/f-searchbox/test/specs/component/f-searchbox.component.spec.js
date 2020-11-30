import SearchboxComponent from '../../../test-utils/component-objects/f-searchbox.component';

describe('f-searchbox component tests', () => {
    it('should display the f-searchbox component', () => {
        // Assert
        expect(SearchboxComponent.isSearchboxComponentDisplayed()).toBe(true);
    });
});
