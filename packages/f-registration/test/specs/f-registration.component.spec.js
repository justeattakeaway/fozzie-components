import RegistrationComponent from '../../test-utils/component-objects/f-registration.component';

describe('f-header component tests', () => {
    it('should display error if first name field is empty', () => {

        // Arrange
        browser.url('http://localhost:8081');

        const userInfo = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        };

        // Act
        RegistrationComponent.submitRegistrationForm(userInfo);

        // Assert
        expect(RegistrationComponent.isFirstNameEmptyErrorDisplayed()).toBe(true);
        expect(RegistrationComponent.isLastNameEmptyErrorDisplayed()).toBe(true);
        expect(RegistrationComponent.isEmailEmptyErrorDisplayed()).toBe(true);
        expect(RegistrationComponent.isPasswordEmptyErrorDisplayed()).toBe(true);
    });

    it('should show and be able to use the legal documentation', () => {
        // Arrange
        browser.url('http://localhost:8081');

        // Act
        RegistrationComponent.waitForRegistrationForm();

        // Assert
        expect(RegistrationComponent.termsAndConditionsLinkCanBeUsed()).toBe(true);
        expect(RegistrationComponent.privacyPolicyLinkCanBeUsed()).toBe(true);
        expect(RegistrationComponent.cookiesPolicyLinkCanBeUsed()).toBe(true);
    });
});

