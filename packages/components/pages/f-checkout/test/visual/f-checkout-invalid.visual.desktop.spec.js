const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

describe('f-checkout - Invalid - Desktop Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout();
        checkout.withQuery('&knob-Service Type', 'invalid-url');

        // Act
        checkout.loadError();
    });

    it('should display the error page component', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Invalid - Base State', 'desktop');
    });
});
