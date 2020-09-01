import RegistrationComponent from '../../test-utils/component-objects/f-registration.component';
import assert from 'assert';

describe('f-header component tests', () => {
    it('should display error if first name field is empty', () => {
        browser.url('http://localhost:8081');

        const userInfo = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        };

        RegistrationComponent.submitRegistrationForm(userInfo);
        assert.ok(RegistrationComponent.firstNameEmptyErrorIsDisplayed());
        assert.ok(RegistrationComponent.lastNameEmptyErrorIsDisplayed());
        assert.ok(RegistrationComponent.emailEmptyErrorIsDisplayed());
        assert.ok(RegistrationComponent.passwordEmptyErrorIsDisplayed());
    });
});

