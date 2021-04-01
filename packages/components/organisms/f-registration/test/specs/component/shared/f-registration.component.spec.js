const forEach = require('mocha-each');
const Registration = require ('../../../../test-utils/component-objects/f-registration.component');
const registration = new Registration();

describe('Shared - f-registration component tests', () => {
    beforeEach(() => {
        registration.open();
        registration.waitForComponent();
    });

    it('should display component', () => {
        // Assert
        expect(registration.isComponentDisplayed()).toBe(true);
    });

    it('should display the "Email address is already registered" error', () => {

        // Arrange
        const userInfo = {
            firstName: 'Test',
            lastName: 'User',
            email: 'test@user.com',
            password: 'testuser123'
        };

        // Act
        registration.submitForm(userInfo);

        // Assert
        expect(registration.isEmailExistsErrorDisplayed()).toBe(true);
    });

    forEach(['firstName', 'lastName', 'email', 'password'])
    .it('should display input field', field => {
        // Assert
        expect(registration.isInputFieldDisplayed(field)).toBe(true);
    });

    forEach(['firstName', 'lastName', 'email', 'password'])
    .it('should display error when fields are empty', field => {
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
        expect(registration.isEmptyErrorDisplayed(field)).toBe(true);
    });

    forEach(['firstName', 'lastName', 'email'])
    .it('should display error when input is invalid', field => {
        // Arrange
        const userInfo = {
            firstName: '123*',
            lastName: '456*',
            email: '***@**',
            password: 'llanfairpwllgwyngyllgogerychwyr'
        };

        // Act
        registration.submitForm(userInfo);
        
        // Assert
        expect(registration.isInvalidErrorDisplayed(field)).toBe(true);
    });

    forEach(['firstName', 'lastName'])
    .it('should display error when input is too long', field => {
        // Arrange
        const userInfo = {
            firstName: 'abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghij',
            lastName: 'abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghij',
            email: 'joe@test.com',
            password: 'abcdefghijabcdefghijabcdefghi'
        };

        // Act
        registration.submitForm(userInfo);
        
        // Assert
        expect(registration.isMaxLengthErrorDisplayed(field)).toBe(true);
    });


    it('should display and be able to click the legal documentation', () => {
        // Assert
        expect(registration.termsAndConditionsLinkCanBeClicked()).toBe(true);
        expect(registration.privacyPolicyLinkCanBeClicked()).toBe(true);
        expect(registration.cookiesPolicyLinkCanBeClicked()).toBe(true);
    });
});
