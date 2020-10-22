import SearchboxComponent from '../../../test-utils/component-objects/f-searchbox.component';

describe('f-searchbox component tests', () => {
    beforeEach(() => {
        // Arrange
        browser.url('http://localhost:8080');
    })

    it('should display the f-searchbox component', () => {
        // Assert
        expect(SearchboxComponent.isSearchboxComponentDisplayed()).toBe(true);
    });
});
