const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout = new Checkout();

const illegalMobileNumber = '123';

describe('f-checkout - Collection - Guest - Mobile Visual Tests', () => {
    const checkoutInfo = {
        serviceType: 'collection',
        isLoggedIn: false,
        isAsapAvailable: true,
        locale: 'en-GB'
    };

    beforeEach(async () => {
        // Arrange
        checkout = new Checkout();

        // Act
        await checkout.load({
            ...checkoutInfo
        });
    });

    it('should display the component base state.', async () => {
        // Assert
        await browser.percyScreenshot('f-checkout - Collection - Guest - Base State', 'mobile');
    });

    it('should display the mandatory error messages', async () => {
        // Act
        await checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Collection - Guest - Mandatory Errors State', 'mobile');
    });

    it('should display the illegal mobile number error message', async () => {
        // Act
        await checkout.setFieldValue('mobileNumber', illegalMobileNumber);
        await checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Collection - Guest - Illegal Mobile Number Error State', 'mobile');
    });

    it('should display the "Duplicate Order Warning" modal', async () => {
        // Arrange
        checkout = new Checkout();

        const args = await argumentStringBuilder({ serviceType: 'collection', isLoggedIn: false, placeOrderError: 'duplicate' });
        await checkout.withQuery('args', args);

        const customerInfo = {
            firstName: 'Jerry',
            lastName: 'Jazzman',
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '07234567890'
        };

        checkout.inputFieldValues = customerInfo;

        // Act
        await checkout.load({
            ...checkoutInfo,
            placeOrderError: 'duplicate'
        });
        await checkout.setFieldValues();
        await checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Collection - Guest - "Duplicate Order Warning" Modal', 'mobile');
    });
});

describe('f-checkout - Collection - Guest - isAsapAvailable: false Mobile Visual Tests', () => {
    beforeEach(async () => {
        // Arrange
        checkout = new Checkout();

        // Act
        await checkout.load({
            serviceType: 'collection',
            isLoggedIn: false,
            isAsapAvailable: false,
            locale: 'en-GB'
        });
    });

    it('should display the pre-order warning.', async () => {
        // Assert
        await browser.percyScreenshot('f-checkout - Collection - Guest - Pre-Order Warning', 'mobile');
    });
});


describe('f-checkout - Delivery - Guest - Mobile Visual Tests', () => {
    const checkoutInfo = {
        serviceType: 'delivery',
        isLoggedIn: false,
        isAsapAvailable: true,
        locale: 'en-GB'
    };

    beforeEach(async () => {
        // Arrange
        checkout = new Checkout();

        // Act
        await checkout.load({
            ...checkoutInfo
        });
    });

    it('should display the delivery f-checkout component guest base state.', async () => {
        // Assert
        await browser.percyScreenshot('f-checkout - Delivery - Guest - Base State', 'mobile');
    });

    it('should display the delivery f-checkout guest mandatory error messages', async () => {
        // Act
        await checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Delivery - Guest - Mandatory Errors State', 'mobile');
    });

    it('should display the illegal mobile number error message', async () => {
        // Act
        await checkout.setFieldValue('mobileNumber', illegalMobileNumber);
        await checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Delivery - Guest - Illegal Mobile Number Error State', 'mobile');
    });

    it('should display the "Duplicate Order Warning" modal', async () => {
        // Arrange
        checkout = new Checkout();

        const args = await argumentStringBuilder({ isLoggedIn: false, placeOrderError: 'duplicate' });
        await checkout.withQuery('args', args);

        await checkout.load();

        const customerInfo = {
            firstName: 'Jerry',
            lastName: 'Jazzman',
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '07234567890',
            addressLine1: '47 Frith  Street',
            addressLocality: 'London',
            addressPostcode: 'W1D 4HT'
        };

        checkout.inputFieldValues = customerInfo;

        // Act
        await checkout.load({
            ...checkoutInfo,
            placeOrderError: 'duplicate'
        });
        await checkout.setFieldValues();
        await checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Delivery - Guest - "Duplicate Order Warning" Modal', 'mobile');
    });
});

describe('f-checkout - Delivery - Guest - isAsapAvailable: false Mobile Visual Tests', () => {
    beforeEach(async () => {
        // Arrange
        checkout = new Checkout();

        // Act
        await checkout.load({
            serviceType: 'delivery',
            isLoggedIn: false,
            isAsapAvailable: false,
            locale: 'en-GB'
        });
    });

    it('should display the pre-order warning.', async () => {
        // Assert
        await browser.percyScreenshot('f-checkout - Delivery - Guest - Pre-Order Warning', 'mobile');
    });
});

describe('f-checkout - Dine In - Guest - Mobile Visual Tests', () => {
    const checkoutInfo = {
        serviceType: 'dinein',
        isLoggedIn: false,
        isAsapAvailable: false,
        locale: 'en-GB'
    };

    beforeEach(async () => {
        // Arrange
        checkout = new Checkout();

        // Act
        await checkout.load({
            ...checkoutInfo
        });
    });

    it('should display the component base state.', async () => {
        // Assert
        await browser.percyScreenshot('f-checkout - Dine in - Guest - Base State', 'mobile');
    });

    it('should display the mandatory error messages', async () => {
        // Act
        await checkout.clearBlurField('tableIdentifier');
        await checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Dine In - Guest - Manadatory Errors', 'mobile');
    });

    it('should display the illegal mobile number error message', async () => {
        // Act
        await checkout.setFieldValue('mobileNumber', illegalMobileNumber);
        await checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Dine In - Guest - Illegal Mobile Number Error State', 'mobile');
    });

    it('should display the "Duplicate Order Warning" modal', async () => {
        // Arrange
        checkout = new Checkout();

        const args = await argumentStringBuilder({
            serviceType: 'dinein', isLoggedIn: false, isAsapAvailable: false, placeOrderError: 'duplicate'
        });
        await checkout.withQuery('args', args);

        const customerInfo = {
            firstName: 'Jerry',
            lastName: 'Jazzman',
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '07234567890',
            tableIdentifier: '10'
        };

        checkout.inputFieldValues = customerInfo;

        // Act
        await checkout.load({
            ...checkoutInfo,
            placeOrderError: 'duplicate'
        });
        await checkout.setFieldValues();
        await checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Dine in - Guest - "Duplicate Order Warning" Modal', 'mobile');
    });
});
