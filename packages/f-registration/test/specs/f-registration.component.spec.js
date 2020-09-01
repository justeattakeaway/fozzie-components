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
        assert.ok(RegistrationComponent.isFirstNameEmptyErrorDisplayed());
        assert.ok(RegistrationComponent.isLastNameEmptyErrorDisplayed());
        assert.ok(RegistrationComponent.isEmailEmptyErrorDisplayed());
        assert.ok(RegistrationComponent.isPasswordEmptyErrorDisplayed());
    });
});

