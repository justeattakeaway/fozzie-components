import Checkout from '../../test-utils/component-objects/f-checkout.component';

const illegalMobileNumber = '123';

describe('f-checkout - Collection - Guest - Mobile Visual Tests', () => {
    const checkoutInfo = {
        serviceType: 'collection',
        isLoggedIn: false,
        isAsapAvailable: true,
        locale: 'en-GB'
    };

    beforeEach(async () => {
        // Act
        await Checkout.load({
            ...checkoutInfo
        });
    });

    it('should display the component base state.', async () => {
        // Assert
        await browser.percyScreenshot('f-checkout - Collection - Guest - Base State', 'mobile');
    });

    it('should display the mandatory error messages', async () => {
        // Act
        await Checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Collection - Guest - Mandatory Errors State', 'mobile');
    });

    it('should display the illegal mobile number error message', async () => {
        // Act
        await Checkout.setFieldValue('mobileNumber', illegalMobileNumber);
        await Checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Collection - Guest - Illegal Mobile Number Error State', 'mobile');
    });

    it('should display the "Duplicate Order Warning" modal', async () => {
        // Arrange
        const customerInfo = {
            firstName: 'Jerry',
            lastName: 'Jazzman',
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '07234567890'
        };

        Checkout.inputFieldValues = customerInfo;

        // Act
        await Checkout.load({
            ...checkoutInfo,
            placeOrderError: 'duplicate'
        });
        await Checkout.setFieldValues();
        await browser.pause(200);
        await Checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Collection - Guest - "Duplicate Order Warning" Modal', 'mobile');
    });
});

describe('f-checkout - Collection - Guest - isAsapAvailable: false Mobile Visual Tests', () => {
    beforeEach(async () => {
        // Act
        await Checkout.load({
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
        // Act
        await Checkout.load({
            ...checkoutInfo
        });
    });

    it('should display the delivery f-checkout component guest base state.', async () => {
        // Assert
        await browser.percyScreenshot('f-checkout - Delivery - Guest - Base State', 'mobile');
    });

    it('should display the delivery f-checkout guest mandatory error messages', async () => {
        // Act
        await Checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Delivery - Guest - Mandatory Errors State', 'mobile');
    });

    it('should display the illegal mobile number error message', async () => {
        // Act
        await Checkout.setFieldValue('mobileNumber', illegalMobileNumber);
        await Checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Delivery - Guest - Illegal Mobile Number Error State', 'mobile');
    });

    it('should display the "Duplicate Order Warning" modal', async () => {
        // Arrange
        const customerInfo = {
            firstName: 'Jerry',
            lastName: 'Jazzman',
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '07234567890',
            addressLine1: '47 Frith  Street',
            addressLocality: 'London',
            addressPostcode: 'W1D 4HT'
        };

        Checkout.inputFieldValues = customerInfo;

        // Act
        await Checkout.load({
            ...checkoutInfo,
            placeOrderError: 'duplicate'
        });
        await Checkout.setFieldValues();
        await browser.pause(200);
        await Checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Delivery - Guest - "Duplicate Order Warning" Modal', 'mobile');
    });
});

describe('f-checkout - Delivery - Guest - isAsapAvailable: false Mobile Visual Tests', () => {
    beforeEach(async () => {
        // Act
        await Checkout.load({
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
        // Act
        await Checkout.load({
            ...checkoutInfo
        });
    });

    it('should display the component base state.', async () => {
        // Assert
        await browser.percyScreenshot('f-checkout - Dine in - Guest - Base State', 'mobile');
    });

    it('should display the mandatory error messages', async () => {
        // Act
        await Checkout.clearBlurField('tableIdentifier');
        await Checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Dine In - Guest - Manadatory Errors', 'mobile');
    });

    it('should display the illegal mobile number error message', async () => {
        // Act
        await Checkout.setFieldValue('mobileNumber', illegalMobileNumber);
        await Checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Dine In - Guest - Illegal Mobile Number Error State', 'mobile');
    });

    it('should display the "Duplicate Order Warning" modal', async () => {
        // Arrange
        const customerInfo = {
            firstName: 'Jerry',
            lastName: 'Jazzman',
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '07234567890',
            tableIdentifier: '10'
        };

        Checkout.inputFieldValues = customerInfo;

        // Act
        await Checkout.load({
            ...checkoutInfo,
            placeOrderError: 'duplicate'
        });
        await Checkout.setFieldValues();
        await browser.pause(200);
        await Checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Dine in - Guest - "Duplicate Order Warning" Modal', 'mobile');
    });
});
