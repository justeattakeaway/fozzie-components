const forEach = require('mocha-each');
const Registration = require('../../test-utils/component-objects/f-registration.component');

let registration;

forEach(['desktop', 'mobile'])
.describe('f-registration - visual tests', device => {
    beforeEach(() => {
        if (device === 'mobile') {
            browser.setWindowSize(414, 731);
        }

        registration = new Registration();
        registration.load();
    });

    it('should display component', () => {
        // Assert
        browser.percyScreenshot('f-registration - Base', device);
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
        Object.keys(userInfo).forEach(field => registration.setFieldValue(field, userInfo[field]));
        registration.submit();

        // Assert
        browser.percyScreenshot('f-registration - "Email is already registered error"', device);
    });

    it('should display error when form field is empty', () => {
        // Act
        registration.submit();

        // Assert
        browser.percyScreenshot('f-registration - "Mandatory field errors"', device);
    });

    it('should display error when form input is invalid', () => {
        // Arrange
        const userInfo = {
            firstName: '123*',
            lastName: '456*',
            email: '***@**',
            password: 'llanfairpwllgwyngyllgogerychwyr'
        };

        // Act
        Object.keys(userInfo).forEach(field => registration.setFieldValue(field, userInfo[field]));
        registration.submit();

        // Assert
        browser.percyScreenshot('f-registration - "Invalid input error"', device);
    });

    it('should display error when form input is too long', () => {
        // Arrange
        const userInfo = {
            firstName: 'abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghij',
            lastName: 'abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghij',
            email: 'abcdefghijabcdefghijabc@defghijabcdefghijabcdefghijabcdefghij.com',
            password: 'abcdefghijabcdefghijabcdefghi'
        };

        // Act
        Object.keys(userInfo).forEach(field => registration.setFieldValue(field, userInfo[field]));
        registration.submit();

        // Assert
        browser.percyScreenshot('f-registration - "Input exceed max length error"', device);
    });
});
