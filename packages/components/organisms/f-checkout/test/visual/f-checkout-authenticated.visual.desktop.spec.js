const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;
let checkoutInfo;

// describe('f-checkout - Collection - Authenticated - Desktop Visual Tests', () => {
//     beforeEach(() => {
//         // Arrange
//         checkout = new Checkout();
//         checkoutInfo = {
//             serviceType: 'collection',
//             isAuthenticated: true,
//             isASAP: true
//         };
//         checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
//             .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
//             .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP);

//         checkout.load();
//     });

//     it('should display the component base state.', () => {
//         // Assert
//         browser.percyScreenshot('f-checkout - Collection - Authenticated - Base State', 'desktop');
//     });

//     it('should display the mandatory error messages.', () => {
//         // Act
//         checkout.clearBlurField('mobileNumber');
//         checkout.goToPayment();

//         // Assert
//         browser.percyScreenshot('f-checkout - Collection - Authenticated - Mandatory Errors State', 'desktop');
//     });

//     it('should display the "Something went wrong" error.', () => {
//         // Arrange
//         checkout = new Checkout();
//         checkoutInfo = {
//             serviceType: 'collection',
//             isAuthenticated: true,
//             isASAP: true,
//             patchError: 'SERVER'
//         };
//         checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
//             .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
//             .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP)
//             .withQuery('&knob-Patch Checkout Errors', checkoutInfo.patchError);

//         // Act
//         checkout.load();
//         checkout.goToPayment();
//         browser.pause(500);

//         // Assert
//         browser.percyScreenshot('f-checkout - Collection - Authenticated - "Something went wrong" Error', 'desktop');
//     });

//     it('should display the "Restaurant not taking orders" modal', () => {
//         // Arrange
//         checkout = new Checkout();
//         checkoutInfo = {
//             serviceType: 'collection',
//             isAuthenticated: true,
//             isASAP: true,
//             patchError: 'restaurant-not-taking-orders'
//         };
//         checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
//             .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
//             .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP)
//             .withQuery('&knob-Patch Checkout Errors', checkoutInfo.patchError);

//         // Act
//         checkout.load();
//         checkout.goToPayment();

//         // Assert
//         browser.percyScreenshot('f-checkout - Collection - Authenticated - "Restaurant not taking orders" Error Modal', 'desktop');
//     });

//     it('should display the illegal mobile number error message', () => {
//         // Arrange
//         const customerInfo = {
//             mobileNumber: '123'
//         };

//         // Act
//         checkout.clearBlurField('mobileNumber');
//         checkout.populateCheckoutForm(checkoutInfo, customerInfo);
//         checkout.goToPayment();

//         // Assert
//         browser.percyScreenshot('f-checkout - Collection - Authenticated - Illegal Mobile Number Error State', 'desktop');
//     });

//     it('should display the "Duplicate Order Warning" modal', () => {
//         // Arrange
//         checkout = new Checkout();
//         checkoutInfo = {
//             serviceType: 'collection',
//             isAuthenticated: true,
//             isASAP: true,
//             orderError: 'duplicate'
//         };
//         checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
//             .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
//             .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP)
//             .withQuery('&knob-Place Order Errors', checkoutInfo.orderError);

//         // Act
//         checkout.load();
//         checkout.goToPayment();

//         // Assert
//         browser.percyScreenshot('f-checkout - Collection - Authenticated - "Duplicate Order Warning" Modal', 'desktop');
//     });
// });

// describe('f-checkout - Collection - Authenticated - isAsapAvailable: false Desktop Visual Tests', () => {
//     beforeEach(() => {
//         // Arrange
//         checkout = new Checkout();
//         checkoutInfo = {
//             serviceType: 'collection',
//             isAuthenticated: true,
//             isASAP: false
//         };
//         checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
//             .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
//             .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP);

//         // Act
//         checkout.load();
//     });

//     it('should display the pre-order warning.', () => {
//         // Assert
//         browser.percyScreenshot('f-checkout - Collection - Authenticated - Pre-Order Warning', 'desktop');
//     });
// });

// describe('f-checkout - Delivery - Authenticated - Desktop Visual Tests', () => {
//     beforeEach(() => {
//         // Arrange
//         checkout = new Checkout();
//         checkoutInfo = {
//             serviceType: 'delivery',
//             isAuthenticated: true,
//             isASAP: true
//         };
//         checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
//             .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
//             .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP);

//         // Act
//         checkout.load();
//     });

//     it('should display the component base state.', () => {
//         // Assert
//         browser.percyScreenshot('f-checkout - Delivery - Authenticated - Base State', 'desktop');
//     });

//     it('should display the mandatory error messages', () => {
//         // Act
//         ['addressLine1', 'addressLocality'].forEach(field => checkout.clearCheckoutField(field));
//         ['mobileNumber', 'addressPostcode'].forEach(field => checkout.clearBlurField(field));
//         checkout.goToPayment();

//         // Assert
//         browser.percyScreenshot('f-checkout - Delivery - Authenticated - Manadatory Errors', 'desktop');
//     });

//     it('should display the illegal postcode error message', () => {
//         // Arrange
//         const customerInfo = {
//             postcode: 'TEST1A'
//         };

//         // Act
//         checkout.clearBlurField('addressPostcode');
//         checkout.populateCheckoutForm(checkoutInfo, customerInfo);
//         checkout.goToPayment();

//         // Assert
//         browser.percyScreenshot('f-checkout - Delivery - Authenticated - Illegal Postcode Error State', 'desktop');
//     });

//     it('should display the illegal mobile number error message', () => {
//         // Arrange
//         const customerInfo = {
//             mobileNumber: '123'
//         };

//         // Act
//         checkout.clearBlurField('mobileNumber');
//         checkout.populateCheckoutForm(checkoutInfo, customerInfo);
//         checkout.goToPayment();

//         // Assert
//         browser.percyScreenshot('f-checkout - Delivery - Authenticated - Illegal Mobile Number Error State', 'desktop');
//     });

//     it('should display the "Duplicate Order Warning" modal', () => {
//         // Arrange
//         checkout = new Checkout();
//         checkoutInfo = {
//             serviceType: 'delivery',
//             isAuthenticated: true,
//             isASAP: true,
//             orderErrors: 'duplicate'
//         };
//         checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
//             .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
//             .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP)
//             .withQuery('&knob-Place Order Errors', checkoutInfo.orderErrors);

//         // Act
//         checkout.load();
//         checkout.goToPayment();

//         // Assert
//         browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Duplicate Order Warning" Modal', 'desktop');
//     });
// });

// describe('f-checkout - Delivery - Authenticated - isAsapAvailable: false Desktop Visual Tests', () => {
//     beforeEach(() => {
//         // Arrange
//         checkout = new Checkout();
//         checkoutInfo = {
//             serviceType: 'delivery',
//             isAuthenticated: true,
//             isASAP: false
//         };
//         checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
//             .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
//             .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP);

//         // Act
//         checkout.load();
//     });

//     it('should display the pre-order warning.', () => {
//         // Assert
//         browser.percyScreenshot('f-checkout - Delivery - Authenticated - Pre-Order Warning', 'desktop');
//     });
// });

// describe('f-checkout - Dine In - Authenticated - Desktop Visual Tests', () => {
//     beforeEach(() => {
//         // Arrange
//         checkout = new Checkout();
//         checkoutInfo = {
//             serviceType: 'dinein',
//             isAuthenticated: true,
//             isASAP: true
//         };
//         checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
//             .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
//             .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP);

//         // Act
//         checkout.load();
//     });

//     it('should display the component base state.', () => {
//         // Assert
//         browser.percyScreenshot('f-checkout - Dine in - Authenticated - Base State', 'desktop');
//     });

//     it('should display the mandatory error messages', () => {
//         // Act
//         checkout.clearCheckoutField('tableIdentifier');
//         checkout.clearBlurField('mobileNumber');
//         checkout.goToPayment();

//         // Assert
//         browser.percyScreenshot('f-checkout - Dine In - Authenticated - Manadatory Errors', 'desktop');
//     });

//     it('should display the illegal mobile number error message', () => {
//         // Arrange
//         const customerInfo = {
//             mobileNumber: '123'
//         };

//         // Act
//         checkout.clearBlurField('mobileNumber');
//         checkout.populateCheckoutForm(checkoutInfo, customerInfo);
//         checkout.goToPayment();

//         // Assert
//         browser.percyScreenshot('f-checkout - Dine In - Authenticated - Illegal Mobile Number Error State', 'desktop');
//     });

//     it('should display the "Duplicate Order Warning" modal', () => {
//         // Arrange
//         checkout = new Checkout();
//         checkoutInfo = {
//             serviceType: 'dinein',
//             isAuthenticated: true,
//             isASAP: true,
//             orderErrors: 'duplicate'
//         };
//         checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
//             .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
//             .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP)
//             .withQuery('&knob-Place Order Errors', checkoutInfo.orderErrors);

//         // Act
//         checkout.load();
//         checkout.goToPayment();

//         // Assert
//         browser.percyScreenshot('f-checkout - Dine in - Authenticated - "Duplicate Order Warning" Modal', 'desktop');
//     });
// });

// describe('f-checkout - Delivery - AU Tenant - visibile state field - Desktop Visual Tests', () => {
//     beforeEach(() => {
//         // Arrange
//         checkout = new Checkout();
//         checkoutInfo = {
//             serviceType: 'delivery',
//             isAuthenticated: true,
//             isASAP: false,
//             locale: 'en-AU'
//         };
//         checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
//             .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
//             .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP)
//             .withQuery('&knob-Locale', checkoutInfo.locale);

//         // Act
//         checkout.load();
//     });

//     it('should display the state input.', () => {
//         // Assert
//         browser.percyScreenshot('f-checkout - Delivery - Authenticated - Visible State field', 'desktop');
//     });
// });

describe('f-checkout - Delivery - AU Tenant - age verification page - Desktop Visual Tests', () => {
    // beforeEach(() => {
    //     // Arrange
    //     checkout = new Checkout();
    //     checkoutInfo = {
    //         serviceType: 'delivery',
    //         isAuthenticated: true,
    //         locale: 'en-AU',
    //         restrictions: 'age-restriction'
    //     };
    //     checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
    //         .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
    //         .withQuery('&knob-Locale', checkoutInfo.locale)
    //         .withQuery('&knob-Restrictions', checkoutInfo.restrictions);
    //     // Act
    //     checkout.loadAgeVerification();
    // });

    beforeEach(() => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'delivery',
            isAuthenticated: true,
            isASAP: true,
            locale: 'en-AU',
            restrictions: 'age-restriction'
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
                    .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
                    .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP)
                    .withQuery('&knob-Locale', checkoutInfo.locale)
                    .withQuery('&knob-Restrictions', checkoutInfo.restrictions);

        checkout.loadAgeVerification();
    });

    it.only('should display the age verification page', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Visible Age Verification', 'desktop');
    });
});
