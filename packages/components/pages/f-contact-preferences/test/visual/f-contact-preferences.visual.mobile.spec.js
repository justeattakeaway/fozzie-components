import forEach from 'mocha-each';

const ContactPreferences = require('../../test-utils/component-objects/f-contactPreferences.component');

let contactPreferences;
const deviceType = 'mobile';

describe('f-contact-preferences - Mobile Visual Tests', () => {
    beforeEach(async () => {
        // Arrange
        contactPreferences = new ContactPreferences();
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s default component state', async locale => {
        // Act
        await contactPreferences.load({ locale });

        // Assert
        await browser.percyScreenshot(`f-contact-preferences - Base State - ${locale}`, deviceType);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s news email & sms checked', async locale => {
        // Act
        await contactPreferences.load({ locale });
        await contactPreferences.clickNewsEmailCheckbox();
        await contactPreferences.clickNewsSmsCheckbox();

        // Assert
        await browser.percyScreenshot(`f-contact-preferences - Checked Preferences State - ${locale}`, deviceType);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Submit success alert', async locale => {
        // Act
        await contactPreferences.load({ locale });
        await contactPreferences.clickNewsEmailCheckbox(); // dirty the form to allow submit
        await contactPreferences.clickSubmitButton();
        await contactPreferences.waitForComponent();

        // Assert
        await browser.percyScreenshot(`f-contact-preferences - Submit Success Alert - ${locale}`, deviceType);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Submit error alert', async locale => {
        // Act
        await contactPreferences.load({
            locale,
            apiState: 'post-preferences-fails'
        });
        await contactPreferences.clickNewsEmailCheckbox(); // dirty the form to allow submit
        await contactPreferences.clickSubmitButton();
        await contactPreferences.waitForComponent();

        // Assert
        await browser.percyScreenshot(`f-contact-preferences - Submit Error Alert - ${locale}`, deviceType);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Load error page', async locale => {
        // Act
        await contactPreferences.load({
            locale,
            apiState: 'get-preferences-fails'
        });

        // Assert
        await browser.percyScreenshot(`f-contact-preferences - Load Error Page - ${locale}`, deviceType);
    });
});
