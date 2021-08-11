import forEach from 'mocha-each';

const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const Registration = require('../../test-utils/component-objects/f-registration.component');

let registration;

describe('f-registration - Desktop visual tests', () => {
    beforeEach(() => {
        registration = new Registration('organism', 'registration-component');
        const pageUrl = buildUrl(registration.componentType, registration.componentName, registration.path);
        registration.open(pageUrl);
        registration.waitForComponent();
    });

    it('should display component', () => {
        // Assert
        browser.percyScreenshot('f-registration - Base', 'desktop');
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
        browser.percyScreenshot('f-registration - "Email is already registered error"', 'desktop');
    });

    it('should display error when "%s" field is empty', field => {
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
        browser.percyScreenshot('f-registration - "Mandatory field errors"', 'desktop');
    });

    it('should display error when "%s" input is invalid', () => {
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
        browser.percyScreenshot('f-registration - "Invalid input error"', 'desktop');
    });

    it('should display error when "%s" input is too long', field => {
        // Arrange
        const userInfo = {
            firstName: 'abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghij',
            lastName: 'abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghij',
            email: 'abcdefghijabcdefghijabc@defghijabcdefghijabcdefghijabcdefghij.com',
            password: 'abcdefghijabcdefghijabcdefghi'
        };

        // Act
        registration.submitForm(userInfo);

        // Assert
        browser.percyScreenshot('f-registration - "Input exceed max length error"', 'desktop');
    });
});
