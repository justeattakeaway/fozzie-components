import RegistrationComponent from '../../page-objects/f-registration.page';
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
    });
});

