const TakeawayPayComponent = require('../../test-utils/component-objects/f-takeawaypayActivation.component');

let takeawayPayComponent;

describe('f-takeawaypay-activation - Unauthenticated - Desktop Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        takeawayPayComponent = new TakeawayPayComponent();

        // Act
        takeawayPayComponent.load();
    });

    it('should display the component when the user is not logged in.', () => {
        // Assert
        browser.percyScreenshot('f-takeawaypay-activation - Unauthenticated', 'desktop');
    });
});
