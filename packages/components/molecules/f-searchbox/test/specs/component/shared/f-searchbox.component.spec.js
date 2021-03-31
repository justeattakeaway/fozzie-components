const Searchbox = require('../../../../test-utils/component-objects/f-searchbox.component');
const searchbox = new Searchbox();

describe('f-searchbox component tests', () => {
    beforeEach(() => {
        searchbox.open();
        searchbox.waitForComponent();
    });

    it('should display the f-searchbox component', () => {
        // Assert
        expect(searchbox.isComponentDisplayed()).toBe(true);
    });
});
