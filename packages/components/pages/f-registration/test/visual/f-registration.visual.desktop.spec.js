import Registration from '../../test-utils/component-objects/f-registration.component';

const devices = [
    'desktop',
    'mobile'
];

devices.forEach(device => {
    describe('f-registration - visual tests', () => {
        beforeEach(async () => {
            if (device === 'mobile') {
                await browser.setWindowSize(414, 731);
            }

            await Registration.load();
        });

        it('should display component', async () => {
            // Assert
            await browser.percyScreenshot('f-registration - Base', device);
        });

        it('should display the "Email address is already registered" error', async () => {
            // Arrange
            const userInfo = {
                firstName: 'Test',
                lastName: 'User',
                email: 'test@user.com',
                password: 'testuser123'
            };

            // Act
            Object.keys(userInfo).forEach(field => Registration.setFieldValue(field, userInfo[field]));
            await browser.pause(500);
            await Registration.submit();

            // Assert
            await browser.percyScreenshot('f-registration - "Email is already registered error"', device);
        });

        it('should display error when form field is empty', async () => {
            // Act
            await Registration.submit();

            // Assert
            await browser.percyScreenshot('f-registration - "Mandatory field errors"', device);
        });

        it('should display error when form input is invalid', async () => {
            // Arrange
            const userInfo = {
                firstName: '123*',
                lastName: '456*',
                email: '***@**',
                password: 'llanfairpwllgwyngyllgogerychwyr'
            };

            // Act
            Object.keys(userInfo).forEach(field => Registration.setFieldValue(field, userInfo[field]));
            await Registration.submit();

            // Assert
            await browser.percyScreenshot('f-registration - "Invalid input error"', device);
        });

        it('should display error when form input is too long', async () => {
            // Arrange
            const userInfo = {
                firstName: 'abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghij',
                lastName: 'abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghij',
                email: 'abcdefghijabcdefghijabc@defghijabcdefghijabcdefghijabcdefghij.com',
                password: 'abcdefghijabcdefghijabcdefghi'
            };

            // Act
            Object.keys(userInfo).forEach(field => Registration.setFieldValue(field, userInfo[field]));
            await Registration.submit();

            // Assert
            await browser.percyScreenshot('f-registration - "Input exceed max length error"', device);
        });
    });
});
