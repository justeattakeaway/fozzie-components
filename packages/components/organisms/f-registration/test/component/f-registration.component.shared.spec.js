import forEach from 'mocha-each';

const Registration = require('../../test-utils/component-objects/f-registration.component');

let registration;

describe('Shared - f-registration component tests - @browserstack', () => {
    beforeEach(() => {
        registration = new Registration();
        registration.load();
    });

//Percy test
    it('should display component', () => {
        // Assert
        expect(registration.isComponentDisplayed()).toBe(true);
    });
//Percy test
    it('should display the "Email address is already registered" error - @percy', () => {
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
//Will not be converted
    forEach(['firstName', 'lastName', 'email', 'password'])
    .it('should display input field "%s" - @percy', field => {
        // Assert
        expect(registration.isInputFieldDisplayed(field)).toBe(true);
    });
//Percy test
    // Refactor for Percy visual regression
    forEach(['firstName', 'lastName', 'email', 'password'])
    .it('should display error when "%s" field is empty - @percy', field => {
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
//Percy test (In this case we will need two tests. 1 to ensure field validation.
//And another to ensure error is thrown after create account button is hit. )
    // Refactor for Percy visual regression
    forEach(['firstName', 'lastName', 'email'])
    .it('should display error when "%s" input is invalid - @percy', field => {
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

//Percy test(No max length on password field)
    // Refactor for Percy visual regression
    forEach(['firstName', 'lastName'])
    .it('should display error when "%s" input is too long - @percy', field => {
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

//Will not be converted
    it('should display and be able to click the legal documentation', () => {
        // Assert
        expect(registration.termsAndConditionsLinkCanBeClicked()).toBe(true);
        expect(registration.privacyPolicyLinkCanBeClicked()).toBe(true);
        expect(registration.cookiesPolicyLinkCanBeClicked()).toBe(true);
    });
});
