import RegistrationComponent from '../../../test-utils/component-objects/f-registration.component';

describe('f-registration component tests', () => {
    beforeEach(() => {
        // Arrange
        browser.url('http://localhost:8081');
    });

    it.only('should display errors if mandatory fields are empty', () => {
        // Arrange
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

    it('should show and be able to click the legal documentation', () => {
        // Act
        RegistrationComponent.waitForRegistrationForm();

        // Assert
        expect(RegistrationComponent.termsAndConditionsLinkCanBeClicked()).toBe(true);
        expect(RegistrationComponent.privacyPolicyLinkCanBeClicked()).toBe(true);
        expect(RegistrationComponent.cookiesPolicyLinkCanBeClicked()).toBe(true);
    });
});
