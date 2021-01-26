import Registration from '../../../test-utils/component-objects/f-registration.component';
const registration = new Registration();
import forEach from 'mocha-each';

describe('f-registration component tests', () => {
    beforeEach(() => {
        registration.open();
        // registration.waitForComponent();
    });

    it('should display component', () => {
        expect(registration.isComponentDisplayed()).toBe(true);
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
        registration.submitForm(userInfo);

        // Assert
        expect(registration.isFirstNameEmptyErrorDisplayed()).toBe(true);
        console.log(registration.fields.firstname.emptyError())
        // expect(RegistrationPage.isLastNameEmptyErrorDisplayed()).toBe(true);
        // expect(RegistrationPage.isEmailEmptyErrorDisplayed()).toBe(true);
        // expect(RegistrationPage.isPasswordEmptyErrorDisplayed()).toBe(true);
    });

    forEach(['firstName', 'lastName', 'email', 'password'])
    .it('should display input field', field => {
        // Assert
        expect(registration.isInputFieldDisplayed(field)).toBe(true);
    });

    // it.skip('should show and be able to click the legal documentation', () => {
    //     // Act
    //     RegistrationComponent.waitForRegistrationForm();

    //     // Assert
    //     expect(RegistrationComponent.termsAndConditionsLinkCanBeClicked()).toBe(true);
    //     expect(RegistrationComponent.privacyPolicyLinkCanBeClicked()).toBe(true);
    //     expect(RegistrationComponent.cookiesPolicyLinkCanBeClicked()).toBe(true);
    // });
});
