import forEach from 'mocha-each';

const TakeawayPayComponent = require('../../test-utils/component-objects/f-takeawaypayActivation.component');
const { AUTHENTICATION_JWT } = require('../../test-utils/constants/f-takeawaypayActivation');

let takeawayPayComponent;

describe('f-takeawaypay-activation - Authenticated - Desktop Visual Tests', () => {
    beforeEach(async () => {
        // Arrange
        takeawayPayComponent = new TakeawayPayComponent();
        await takeawayPayComponent
            .withQuery('knob-Authentication', AUTHENTICATION_JWT)
            .withQuery('knob-Employee Id', '12345')
            .withQuery('knob-Home URL', '/home')
            .withQuery('knob-Login URL', '/account/login')
            .withQuery('knob-Registration URL', '/account/register');
    });

    forEach(['en-GB', 'en-AU'])
    .it('should display user details when the user is logged in and tenant is "%s"', async tenant => {
        // Arrange
        await takeawayPayComponent.withQuery('knob-Locale', tenant);

        // Act
        await takeawayPayComponent.load('loggedIn');

        // Assert
        await browser.percyScreenshot(`f-takeawaypay-activation - Authenticated - ${tenant}`, 'desktop');
    });

    forEach(['en-GB', 'en-AU'])
    .it('should display a successful message when the activation is successful and tenant is "%s"', async tenant => {
        // Arrange
        await takeawayPayComponent.withQuery('knob-Locale', tenant);

        // Act
        await takeawayPayComponent.load('loggedIn');
        await takeawayPayComponent.clickActivateTakeawayPayButton();
        await takeawayPayComponent.waitForActivationSuccessComponent();
        await browser.pause(500);

        // Assert
        await browser.percyScreenshot(`f-takeawaypay-activation - Successful activation - ${tenant}`, 'desktop');
    });
});
