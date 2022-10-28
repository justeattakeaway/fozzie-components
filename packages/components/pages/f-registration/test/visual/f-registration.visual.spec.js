import Registration from '../../test-utils/component-objects/f-registration.component';

const devices = [
    'desktop',
    'mobile'
];

const locales = ['en-GB', 'en-AU', 'en-NZ', 'en-IE', 'es-ES', 'it-IT'];

devices.forEach(device => {
    locales.forEach(locale => {
        describe('f-registration - visual tests', () => {
            beforeEach(async () => {
                if (device === 'mobile') {
                    await browser.setWindowSize(414, 731);
                }
    
                await Registration.load({locale});
            });

            it(`should display the ${locale} registration component`, async () => {
                // Assert
                await browser.percyScreenshot(`f-registration - ${locale} - Base`, device);
            });
    
            it(`should display the "Email address is already registered" error - ${locale}`, async () => {
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
                await browser.percyScreenshot(`f-registration - ${locale} - "Email is already registered error"`, device);
            });
    
            it(`should display error when form field is empty - ${locale}`, async () => {
                // Act
                await Registration.submit();
    
                // Assert
                await browser.percyScreenshot(`f-registration - ${locale} - "Mandatory field errors"`, device);
            });
    
            it(`should display error when form input is invalid - ${locale}`, async () => {
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
                await browser.percyScreenshot(`f-registration - ${locale} - "Invalid input error"`, device);
            });
    
            it(`should display error when form input is too long - ${locale}`, async () => {
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
                await browser.percyScreenshot(`f-registration - ${locale} - "Input exceed max length error"`, device);
            });
        });
    });
});
