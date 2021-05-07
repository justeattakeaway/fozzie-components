import forEach from 'mocha-each';

const Registration = require('../../test-utils/component-objects/f-registration.component');

const registration = new Registration();

describe('Shared - f-registration component tests - @browserstack', () => {
    beforeEach(() => {
        registration.open();
        registration.waitForComponent();
    });

    it('should display component', () => {
        // Assert
        expect(registration.isComponentDisplayed()).toBe(true);
    });

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

    // Refactor for Percy visual regression
    forEach(['firstName', 'lastName', 'email', 'password'])
    .it('should display input field "%s" - @percy', field => {
        // Assert
        expect(registration.isInputFieldDisplayed(field)).toBe(true);
    });

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


    it('should display and be able to click the legal documentation', () => {
        // Assert
        expect(registration.termsAndConditionsLinkCanBeClicked()).toBe(true);
        expect(registration.privacyPolicyLinkCanBeClicked()).toBe(true);
        expect(registration.cookiesPolicyLinkCanBeClicked()).toBe(true);
    });
});
