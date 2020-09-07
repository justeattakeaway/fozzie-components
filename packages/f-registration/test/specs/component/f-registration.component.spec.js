import RegistrationComponent from '../../../test-utils/component-objects/f-registration.component';

describe('f-header component tests', () => {
    it('should display errors if mandatory fields are empty', () => {

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
});
