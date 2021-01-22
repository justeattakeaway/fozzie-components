import SearchboxComponent from '../../../test-utils/component-objects/f-searchbox.component';
import { MOLECULES } from '../../../../../../../url.selectors';

describe('f-searchbox component tests', () => {
    beforeEach(() => {
        browser.url(`${MOLECULES}searchbox-component`);
    });

    it.skip('should display the f-searchbox component', () => {
        // Assert
        expect(SearchboxComponent.isSearchboxComponentDisplayed()).toBe(true);
    });
});
