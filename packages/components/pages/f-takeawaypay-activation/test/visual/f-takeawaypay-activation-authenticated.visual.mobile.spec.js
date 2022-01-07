import forEach from 'mocha-each';

const TakeawayPayComponent = require('../../test-utils/component-objects/f-takeawaypayActivation.component');
const { AUTHENTICATION_JWT } = require('../../test-utils/constants/f-takeawaypayActivation');

let takeawayPayComponent;

describe('f-takeawaypay-activation - Authenticated - Mobile Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        takeawayPayComponent = new TakeawayPayComponent();
        takeawayPayComponent
            .withQuery('knob-Authentication', AUTHENTICATION_JWT)
            .withQuery('knob-Employee Id', '12345')
            .withQuery('knob-Home URL', '/home')
            .withQuery('knob-Login URL', '/account/login')
            .withQuery('knob-Registration URL', '/account/register');
    });

    forEach(['en-GB', 'en-AU'])
    .it('should display user details when the user is logged in and tenant is "%s"', tenant => {
        // Arrange
        takeawayPayComponent.withQuery('knob-Locale', tenant);

        // Act
        takeawayPayComponent.load('loggedIn');

        // Assert
        browser.percyScreenshot(`f-takeawaypay-activation - Authenticated - ${tenant}`, 'mobile');
    });

    forEach(['en-GB', 'en-AU'])
    .it('should display a successful message when the activation is successful and tenant is "%s"', tenant => {
        // Arrange
        takeawayPayComponent.withQuery('knob-Locale', tenant);

        // Act
        takeawayPayComponent.load('loggedIn');
        takeawayPayComponent.clickActivateTakeawayPayButton();
        takeawayPayComponent.waitForActivationSuccessComponent();
        browser.pause(500);

        // Assert
        browser.percyScreenshot(`f-takeawaypay-activation - Successful activation - ${tenant}`, 'mobile');
    });
});
