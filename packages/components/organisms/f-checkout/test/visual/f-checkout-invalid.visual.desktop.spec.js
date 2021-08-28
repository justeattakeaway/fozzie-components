const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

describe('f-checkout - Invalid - Desktop Visual Tests', () => {
    beforeEach(() => {
        // Act
        checkout.loadError({
            'Service Type': 'invalid-url'
        });
    });

    it('should display the error page component', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Invalid - Base State', 'desktop');
    });
});
