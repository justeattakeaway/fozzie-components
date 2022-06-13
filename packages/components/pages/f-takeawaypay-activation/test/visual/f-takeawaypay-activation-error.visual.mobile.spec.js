import forEach from 'mocha-each';

const TakeawayPayComponent = require('../../test-utils/component-objects/f-takeawaypayActivation.component');

let takeawayPayComponent;

describe('f-takeawaypay-activation - Error page - Mobile Visual Tests', () => {
    beforeEach(async () => {
        // Arrange
        takeawayPayComponent = new TakeawayPayComponent();
        await takeawayPayComponent
            .withQuery('knob-Activation Status Response', '400')
            .withQuery('knob-Employee Id', '12345')
            .withQuery('knob-Home URL', '/home')
            .withQuery('knob-Login URL', '/account/login')
            .withQuery('knob-Registration URL', '/account/register');
    });

    forEach(['en-GB', 'en-AU'])
    .it('should display the component when there is an error and tenant is "%s"', async tenant => {
        // Arrange
        await takeawayPayComponent.withQuery('knob-Locale', tenant);

        // Act
        await takeawayPayComponent.load('error');

        // Assert
        await browser.percyScreenshot(`f-takeawaypay-activation - Error - ${tenant}`, 'mobile');
    });
});
