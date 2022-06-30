import forEach from 'mocha-each';

const TakeawayPayComponent = require('../../test-utils/component-objects/f-takeawaypayActivation.component');

let takeawayPayComponent;

describe('f-takeawaypay-activation - Unauthenticated - Desktop Visual Tests', () => {
    beforeEach(async () => {
        // Arrange
        takeawayPayComponent = new TakeawayPayComponent();
    });

    forEach(['en-GB', 'en-AU'])
    .it('should display the component when the user is not logged in and tenant is "%s"', async tenant => {
        // Arrange
        await takeawayPayComponent.withQuery('knob-Locale', tenant);

        // Act
        await takeawayPayComponent.load();

        // Assert
        await browser.percyScreenshot(`f-takeawaypay-activation - Unauthenticated - ${tenant}`, 'desktop');
    });
});
