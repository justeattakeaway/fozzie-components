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
            firstName: {
                input: 'Test'
            },
            lastName: {
                input: 'User'
            },
            email: {
                input: 'test@user.com'
            },
            password: {
                input: 'testuser123'
            }
        };
        // Act
        Object.keys(userInfo).forEach(field => registration.populateForm(field, userInfo));
        registration.submit();

        // Assert
        browser.percyScreenshot('f-registration - "Email is already registered error"', device);
    });

    it('should display error when form field is empty', () => {
        // Arrange
        const userInfo = {
            firstName: {
                input: ''
            },
            lastName: {
                input: ''
            },
            email: {
                input: ''
            },
            password: {
                input: ''
            }
        };

        // Act
        Object.keys(userInfo).forEach(field => registration.populateForm(field, userInfo));
        registration.submit();

        // Assert
        browser.percyScreenshot('f-registration - "Mandatory field errors"', device);
    });

    it('should display error when form input is invalid', () => {
        // Arrange
        const userInfo = {
            firstName: {
                input: '123*'
            },
            lastName: {
                input: '456*'
            },
            email: {
                input: '***@**'
            },
            password: {
                input: 'llanfairpwllgwyngyllgogerychwyr'
            }
        };

        // Act
        Object.keys(userInfo).forEach(field => registration.populateForm(field, userInfo));
        registration.submit();

        // Assert
        browser.percyScreenshot('f-registration - "Invalid input error"', device);
    });

    it('should display error when form input is too long', () => {
        // Arrange
        const userInfo = {
            firstName: {
                input: 'abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghij'
            },
            lastName: {
                input: 'abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghij'
            },
            email: {
                input: 'abcdefghijabcdefghijabc@defghijabcdefghijabcdefghijabcdefghij.com'
            },
            password: {
                input: 'abcdefghijabcdefghijabcdefghi'
            }
        };

        // Act
        Object.keys(userInfo).forEach(field => registration.populateForm(field, userInfo));
        registration.submit();

        // Assert
        browser.percyScreenshot('f-registration - "Input exceed max length error"', device);
    });
});
