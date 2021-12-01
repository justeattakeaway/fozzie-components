import forEach from 'mocha-each';

const TakeawayPayComponent = require('../../test-utils/component-objects/f-takeawaypayActivation.component');

let takeawayPayComponent;

describe('f-takeawaypay-activation - Unauthenticated - Desktop Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        takeawayPayComponent = new TakeawayPayComponent();
    });

    forEach(['en-GB', 'en-AU'])
    .it('should display the component when the user is not logged in and tenant is "%s"', tenant => {
        // Arrange
        takeawayPayComponent.withQuery('knob-Locale', tenant);

        // Act
        takeawayPayComponent.load();

        // Assert
        browser.percyScreenshot(`f-takeawaypay-activation - Unauthenticated - ${tenant}`, 'desktop');
    });
});
