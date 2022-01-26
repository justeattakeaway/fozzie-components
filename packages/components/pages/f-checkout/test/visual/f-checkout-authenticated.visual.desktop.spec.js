import forEach from 'mocha-each';

const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;
let checkoutInfo;

forEach(['Desktop', 'Mobile'])
.describe('f-checkout - Collection - Authenticated - %s Visual Tests', device => {
    beforeEach(() => {
        if (device === 'Mobile') {
            browser.setWindowSize(414, 731);
        } else {
            browser.setWindowSize(1280, 900);
        }

        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'collection',
            isAuthenticated: true,
            isASAP: true
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP);

        checkout.load();
    });

    it('should display the component base state.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Base State', device.toLowerCase());
    });

    it('should display the mandatory error messages.', () => {
        // Act
        checkout.clearBlurField('mobileNumber');
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Mandatory Errors State', device.toLowerCase());
    });

    it('should display the "Something went wrong" error.', () => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'collection',
            isAuthenticated: true,
            isASAP: true,
            patchError: 'SERVER'
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP)
            .withQuery('&knob-Patch Checkout Errors', checkoutInfo.patchError);

        // Act
        checkout.load();
        checkout.goToPayment();
        browser.pause(500);

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Something went wrong" Error', device.toLowerCase());
    });

    it('should display the "Restaurant not taking orders" modal', () => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'collection',
            isAuthenticated: true,
            isASAP: true,
            patchError: 'restaurant-not-taking-orders'
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP)
            .withQuery('&knob-Patch Checkout Errors', checkoutInfo.patchError);

        // Act
        checkout.load();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Restaurant not taking orders" Error Modal', device.toLowerCase());
    });

    it('should display the illegal mobile number error message', () => {
        // Arrange
        const customerInfo = {
            mobileNumber: {
                input: '123'
            }
        };

        // Act
        checkout.clearBlurField('mobileNumber');
        checkout.populateForm('mobileNumber', customerInfo);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Illegal Mobile Number Error State', device.toLowerCase());
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'collection',
            isAuthenticated: true,
            isASAP: true,
            orderError: 'duplicate'
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP)
            .withQuery('&knob-Place Order Errors', checkoutInfo.orderError);

        // Act
        checkout.load();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Duplicate Order Warning" Modal', device.toLowerCase());
    });
});

forEach(['Desktop', 'Mobile'])
.describe('f-checkout - Collection - Authenticated - isAsapAvailable: false %s Visual Tests', device => {
    beforeEach(() => {
        if (device === 'Mobile') {
            browser.setWindowSize(414, 731);
        } else {
            browser.setWindowSize(1280, 900);
        }
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'collection',
            isAuthenticated: true,
            isASAP: false
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP);

        // Act
        checkout.load();
    });

    it('should display the pre-order warning.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Pre-Order Warning', device.toLowerCase());
    });
});

forEach(['Desktop', 'Mobile'])
.describe('f-checkout - Delivery - Authenticated - %s Visual Tests', device => {
    beforeEach(() => {
        if (device === 'Mobile') {
            browser.setWindowSize(414, 731);
        } else {
            browser.setWindowSize(1280, 900);
        }
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'delivery',
            isAuthenticated: true,
            isASAP: true
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP);

        // Act
        checkout.load();
    });

    it('should display the component base state.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Base State', device.toLowerCase());
    });

    it('should display the mandatory error messages', () => {
        // Act
        ['mobileNumber', 'addressPostcode', 'addressLine1', 'addressLocality'].forEach(field => checkout.clearBlurField(field));
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Manadatory Errors', device.toLowerCase());
    });

    it('should display the illegal postcode error message', () => {
        // Arrange
        const customerInfo = {
            addressPostcode: {
                input: 'TEST1A'
            }
        };

        // Act
        checkout.clearBlurField('addressPostcode');
        checkout.populateForm('addressPostcode', customerInfo);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Illegal Postcode Error State', device.toLowerCase());
    });

    it('should display the illegal mobile number error message', () => {
        // Arrange
        const customerInfo = {
            mobileNumber: {
                input: '123'
            }
        };

        // Act
        checkout.clearBlurField('mobileNumber');
        checkout.populateForm('mobileNumber', customerInfo);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Illegal Mobile Number Error State', device.toLowerCase());
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'delivery',
            isAuthenticated: true,
            isASAP: true,
            orderErrors: 'duplicate'
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP)
            .withQuery('&knob-Place Order Errors', checkoutInfo.orderErrors);

        // Act
        checkout.load();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Duplicate Order Warning" Modal', device.toLowerCase());
    });
});

forEach(['Desktop', 'Mobile'])
.describe('f-checkout - Delivery - Authenticated - isAsapAvailable: false %s Visual Tests', device => {
    beforeEach(() => {
        if (device === 'Mobile') {
            browser.setWindowSize(414, 731);
        } else {
            browser.setWindowSize(1280, 900);
        }
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'delivery',
            isAuthenticated: true,
            isASAP: false
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP);

        // Act
        checkout.load();
    });

    it('should display the pre-order warning.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Pre-Order Warning', device.toLowerCase());
    });
});

forEach(['Desktop', 'Mobile'])
.describe('f-checkout - Dine In - Authenticated - %s Visual Tests', device => {
    beforeEach(() => {
        if (device === 'Mobile') {
            browser.setWindowSize(414, 731);
        } else {
            browser.setWindowSize(1280, 900);
        }
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'dinein',
            isAuthenticated: true,
            isASAP: true
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP);

        // Act
        checkout.load();
    });

    it('should display the component base state.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Dine in - Authenticated - Base State', device.toLowerCase());
    });

    it('should display the mandatory error messages', () => {
        // Act
        ['mobileNumber', 'tableIdentifier'].forEach(field => checkout.clearBlurField(field));
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine In - Authenticated - Manadatory Errors', device.toLowerCase());
    });

    it('should display the illegal mobile number error message', () => {
        // Arrange
        const customerInfo = {
            mobileNumber: {
                input: '123'
            }
        };

        // Act
        checkout.clearBlurField('mobileNumber');
        checkout.populateForm('mobileNumber', customerInfo);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine In - Authenticated - Illegal Mobile Number Error State', device.toLowerCase());
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'dinein',
            isAuthenticated: true,
            isASAP: true,
            orderErrors: 'duplicate'
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP)
            .withQuery('&knob-Place Order Errors', checkoutInfo.orderErrors);

        // Act
        checkout.load();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine in - Authenticated - "Duplicate Order Warning" Modal', device.toLowerCase());
    });

    it('should display the two notes fields if there is two noteTypes.', () => {
        // Arrange
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'collection')
            .withQuery('&knob-Is User Logged In', true)
            .withQuery('&knob-Is ASAP available', true)
            .withQuery('$knob-Note types', 'get-notes-config-split');
        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Base State - Two Notes Inputs', device.toLowerCase());
    });
});

forEach(['Desktop', 'Mobile'])
.describe('f-checkout - Delivery - AU Tenant - visibile state field - %s Visual Tests', device => {
    beforeEach(() => {
        if (device === 'Mobile') {
            browser.setWindowSize(414, 731);
        } else {
            browser.setWindowSize(1280, 900);
        }

        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'delivery',
            isAuthenticated: true,
            isASAP: false,
            locale: 'en-AU'
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP)
            .withQuery('&knob-Locale', checkoutInfo.locale);

        // Act
        checkout.load();
    });

    it('should display the state input.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Visible State field', device.toLowerCase());
    });
});

forEach(['Desktop', 'Mobile'])
.describe('f-checkout - Delivery - AU Tenant - age verification page - %s Visual Tests', device => {
    beforeEach(() => {
        if (device === 'Mobile') {
            browser.setWindowSize(414, 731);
        } else {
            browser.setWindowSize(1280, 900);
        }

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

    it('should display the age verification page', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Visible Age Verification', device.toLowerCase());
    });
});
