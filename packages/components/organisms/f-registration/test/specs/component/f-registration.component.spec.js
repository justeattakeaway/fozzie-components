import RegistrationComponent from '../../../test-utils/component-objects/f-registration.component';
import { ORGANISMS } from '../../../../../../../url.selectors';

describe('f-registration component tests', () => {
    beforeEach(() => {
        browser.url(`${ORGANISMS}registration-component`);
    });

    it.skip('should display errors if mandatory fields are empty', () => {
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

    it.skip('should show and be able to click the legal documentation', () => {
        // Act
        RegistrationComponent.waitForRegistrationForm();

        // Assert
        expect(RegistrationComponent.termsAndConditionsLinkCanBeClicked()).toBe(true);
        expect(RegistrationComponent.privacyPolicyLinkCanBeClicked()).toBe(true);
        expect(RegistrationComponent.cookiesPolicyLinkCanBeClicked()).toBe(true);
    });
});
