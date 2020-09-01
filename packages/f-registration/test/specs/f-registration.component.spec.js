import RegistrationComponent from '../../test-utils/component-objects/f-registration.component';
import assert from 'assert';

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
        assert.ok(RegistrationComponent.isFirstNameEmptyErrorDisplayed());
        assert.ok(RegistrationComponent.isLastNameEmptyErrorDisplayed());
        assert.ok(RegistrationComponent.isEmailEmptyErrorDisplayed());
        assert.ok(RegistrationComponent.isPasswordEmptyErrorDisplayed());
    });
});

