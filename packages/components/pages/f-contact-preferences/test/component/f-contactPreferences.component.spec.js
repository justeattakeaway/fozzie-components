const ContactPreferences = require('../../test-utils/component-objects/f-contactPreferences.component');

let contactPreferences;

describe('f-contactPreferences component tests', () => {
    beforeEach(() => {
        contactPreferences = new ContactPreferences();

        contactPreferences.load();
        contactPreferences.waitForComponent();
    });

    it('should display the f-contactPreferences component', () => {
        // Assert
        expect(contactPreferences.isComponentDisplayed()).toBe(true);
    });
});
