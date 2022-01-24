import forEach from 'mocha-each';

const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout = new Checkout();
let checkoutInfo;

const customerInfo = {
    firstName: {
        input: 'Jerry'
    },
    lastName: {
        input: 'Jazzman'
    },
    emailAddress: {
        input: 'jerry.jazzman@ronniescotts.co.uk'
    },
    mobileNumber: {
        input: '07234567890'
    }
};

forEach(['desktop', 'mobile'])
.describe('f-checkout - Collection - Guest - Visual Tests', device => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'collection',
            isAuthenticated: false,
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
        browser.percyScreenshot('f-checkout - Collection - Guest - Base State', device);
    });

    it('should display the mandatory error messages', () => {
        // Act
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Guest - Mandatory Errors State', device);
    });

    it('should display the illegal mobile number error message', () => {
        // Arrange
        customerInfo.mobileNumber.input = '123';

        // Act
        checkout.populateForm('mobileNumber', customerInfo);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Guest - Illegal Mobile Number Error State', device);
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'collection',
            isAuthenticated: false,
            isASAP: true,
            orderError: 'duplicate'
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP)
            .withQuery('&knob-Place Order Errors', checkoutInfo.orderError);

        checkout.load();
        // Act
        Object.keys(customerInfo).forEach(field => checkout.populateForm(field, customerInfo));
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Guest - "Duplicate Order Warning" Modal', device);
    });

    it('should display invalid email address', () => {
        // Arrange
        customerInfo.emailAddress.input = '@jazz.man@tunetown.com';

        // Act
        checkout.populateForm('emailAddress', customerInfo);
        browser.keys('Tab');

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Guest - invalid email address Error State', device);
    });
});

forEach(['desktop', 'mobile'])
.describe('f-checkout - Collection - Guest - isAsapAvailable: false - Visual Tests', device => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'collection',
            isAuthenticated: false,
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
        browser.percyScreenshot('f-checkout - Collection - Guest - Pre-Order Warning', device);
    });
});

forEach(['desktop', 'mobile'])
.describe('f-checkout - Delivery - Guest - Visual Tests', device => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'delivery',
            isAuthenticated: false,
            isASAP: true
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP);

        // Act
        checkout.load();
    });

    it('should display the delivery f-checkout component guest base state.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Guest - Base State', device);
    });

    it('should display the delivery f-checkout guest mandatory error messages', () => {
        // Act
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Guest - Mandatory Errors State', device);
    });

    it('should display the illegal mobile number error message', () => {
        // Arrange
        customerInfo.mobileNumber.input = '123';

        // Act
        checkout.populateForm('mobileNumber', customerInfo);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Guest - Illegal Mobile Number Error State', device);
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'delivery',
            isAuthenticated: false,
            isASAP: true,
            orderError: 'duplicate'
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP)
            .withQuery('&knob-Place Order Errors', checkoutInfo.orderError);

        checkout.load();

        const customerInput = {
            ...customerInfo,
            addressLine1: {
                input: '47 Frith  Street'
            },
            addressLocality: {
                input: 'London'
            },
            addressPostcode: {
                input: 'W1D 4HT'
            }
        };

        // Act
        Object.keys(customerInput).forEach(field => checkout.populateForm(field, customerInput));
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Guest - "Duplicate Order Warning" Modal', device);
    });

    it('should display invalid email address', () => {
        // Arrange
        customerInfo.emailAddress.input = '@jazz.man@tunetown.com';

        // Act
        checkout.populateForm('emailAddress', customerInfo);
        browser.keys('Tab');

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Guest - invalid email address Error State', device);
    });
});
forEach(['desktop', 'mobile'])
.describe('f-checkout - Delivery - Guest - isAsapAvailable: false - Visual Tests', device => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'delivery',
            isAuthenticated: false,
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
        browser.percyScreenshot('f-checkout - Delivery - Guest - Pre-Order Warning', device);
    });
});

forEach(['desktop', 'mobile'])
.describe('f-checkout - Dine In - Guest - Visual Tests', device => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'dinein',
            isAuthenticated: false,
            isASAP: false
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP);

        // Act
        checkout.load();
    });

    it('should display the component base state.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Dine in - Guest - Base State', device);
    });

    it('should display the mandatory error messages', () => {
        // Act
        checkout.clearBlurField('tableIdentifier');
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine In - Guest - Manadatory Errors', device);
    });

    it('should display the illegal mobile number error message', () => {
        // Arrange
        customerInfo.mobileNumber.input = '123';

        // Act
        checkout.populateForm('mobileNumber', customerInfo);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine In - Guest - Illegal Mobile Number Error State', device);
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'dinein',
            isAuthenticated: false,
            isASAP: false,
            orderErrors: 'duplicate'
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP)
            .withQuery('&knob-Place Order Errors', checkoutInfo.orderErrors);

        const customerInput = {
            ...customerInfo,
            tableIdentifier: {
                input: '10'
            }
        };

        // Act
        checkout.load();
        Object.keys(customerInput).forEach(field => checkout.populateForm(field, customerInput));
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine in - Guest - "Duplicate Order Warning" Modal', device);
    });
});
