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

    it.Each('should allow me to check the News Preference % checkbox', () => {
        it.each([
            ['email'],
            ['sms']
        ])('should allow me to check the News Preference %s checkbox', async (checkbox) => {
            // Arrange

            // Act
            contactPreferences.checkThePreferenceCheckbox('news', 'email');
            contactPreferences.saveChanges();

            // Assert
            // Waiting for route here, so we can grab redirect url and show form submits.
        });
    });
});
