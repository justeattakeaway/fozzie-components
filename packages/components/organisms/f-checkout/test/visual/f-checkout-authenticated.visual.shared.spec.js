const Checkout = require('../../test-utils/component-objects/f-checkout.component');

const checkout = new Checkout();

describe('f-checkout - Collection - Authenticated - Visual Tests', () => {
    beforeEach(() => {
        const checkoutData = {
            type: 'collection',
            isAuthenticated: true,
            isValid: true,
            isAsapAvailable: true
        };

        checkout.open(checkoutData);
        checkout.waitForComponent();
    });

    it('should display the component base state.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Base State', 'shared');
    });

    it('should display the mandatory error messages.', () => {
        // Act
        checkout.clearCheckoutForm('mobileNumber');
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Mandatory Errors State', 'shared');
    });

    it('should display the "Something went wrong" error.', () => {
        // Arrange
        const checkoutData = {
            type: 'delivery',
            isAuthenticated: true,
            isValid: true,
            checkoutErrors: 'SERVER',
            isAsapAvailable: true
        };

        // Act
        checkout.open(checkoutData);
        checkout.waitForComponent();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Something went wrong" Error', 'shared');
    });

    it('should display the "Restaurant not taking orders" modal', () => {
        // Arrange
        const checkoutData = {
            type: 'delivery',
            isAuthenticated: true,
            isValid: true,
            placeOrderErrors: 'SERVER',
            isAsapAvailable: true

        };

        // Act
        checkout.open(checkoutData);
        checkout.waitForComponent();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Restaurant not taking orders" Error Modal', 'shared');
    });

    it('should display the illegal mobile number error message', () => {
        // Arrange
        const mobileNumberInfo = {
            mobileNumber: '123'
        };

        // Act
        checkout.populateCollectionCheckoutForm(mobileNumberInfo);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Illegal Mobile Number Error State', 'shared');
    });
});

describe('f-checkout - Collection - Authenticated - isAsapAvailable: false Visual Tests', () => {
    beforeEach(() => {
        const checkoutData = {
            type: 'collection',
            isAuthenticated: true,
            isValid: true,
            isAsapAvailable: false
        };

        checkout.open(checkoutData);
        checkout.waitForComponent();
    });

    it('should display the pre-order warning.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Pre-Order Warning', 'shared');
    });
});

describe('f-checkout - Delivery - Authenticated - Visual Tests', () => {
    beforeEach(() => {
        const checkoutData = {
            type: 'delivery',
            isAuthenticated: true,
            isValid: true,
            isAsapAvailable: true
        };

        checkout.open(checkoutData);
        checkout.waitForComponent();
    });

    it('should display the component base state.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Base State', 'shared');
    });

    it('should display the mandatory error messages', field => {
        // Act

        ['mobileNumber', 'addressLine1', 'addressLocality', 'addressPostcode']
            .forEach(field => checkout.clearCheckoutForm(field));

        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Manadatory Errors', 'shared');
    });

    it('should display the illegal postcode error message', () => {
        // Arrange
        const addressInfo = {
            postcode: 'TEST1A'
        };

        // Act
        checkout.populateCheckoutForm(addressInfo);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Illegal Postcode Error State', 'shared');
    });

    it('should display the illegal mobile number error message', () => {
        // Arrange
        const mobileNumberInfo = {
            mobileNumber: '123'
        };

        // Act
        checkout.populateCheckoutForm(mobileNumberInfo);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Illegal Mobile Number Error State', 'shared');
    });
});

describe('f-checkout - Delivery - Authenticated - isAsapAvailable: false Visual Tests', () => {
    beforeEach(() => {
        const checkoutData = {
            type: 'delivery',
            isAuthenticated: true,
            isValid: true,
            isAsapAvailable: false
        };

        checkout.open(checkoutData);
        checkout.waitForComponent();
    });

    it('should display the pre-order warning.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Pre-Order Warning', 'shared');
    });
});

describe('f-checkout - Dine In - Authenticated - Visual Tests', () => {
    beforeEach(() => {
        const checkoutData = {
            type: 'dinein',
            isAuthenticated: true,
            isValid: true,
            isAsapAvailable: true
        };

        checkout.open(checkoutData);
        checkout.waitForComponent();
    });

    it('should display the component base state.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Dine in - Authenticated - Base State', 'shared');
    });

    it('should display the mandatory error messages', field => {
        // Act

        ['mobileNumber', 'tableIdentifier']
            .forEach(field => checkout.clearCheckoutForm(field));

        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine In - Authenticated - Manadatory Errors', 'shared');
    });

    it('should display the illegal table identifier error message', () => {
        // Arrange
        const orderInfo = {
            tableIdentifier: 'Longer than 12 characters'
        };

        // Act
        checkout.populateDineInCheckoutForm(orderInfo);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine In - Authenticated - Illegal Table Identifier Error State', 'shared');
    });

    it('should display the illegal mobile number error message', () => {
        // Arrange
        const mobileNumberInfo = {
            mobileNumber: '123'
        };

        // Act
        checkout.populateDineInCheckoutForm(mobileNumberInfo);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine In - Authenticated - Illegal Mobile Number Error State', 'shared');
    });
});
