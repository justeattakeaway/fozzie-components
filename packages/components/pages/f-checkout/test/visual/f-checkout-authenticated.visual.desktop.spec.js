import Checkout from '../../test-utils/component-objects/f-checkout.component';

const illegalMobileNumber = '123';
let tests;

describe('f-checkout - Collection - Authenticated - Desktop Visual Tests', () => {
    const checkoutInfo = {
        serviceType: 'collection',
        isLoggedIn: true,
        isAsapAvailable: true,
        locale: 'en-GB'
    };

    beforeEach(async () => {
        // Act
        await Checkout.load({
            ...checkoutInfo,
            placeOrderError: 'duplicate'
        });
    });

    it('should display the component base state.', async () => {
        // Assert
        await browser.percyScreenshot('f-checkout - Collection - Authenticated - Base State', 'desktop');
    });

    it('should display the mandatory error messages.', async () => {
        // Act
        await Checkout.clearBlurField('mobileNumber');
        await Checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Collection - Authenticated - Mandatory Errors State', 'desktop');
    });

    it('should display the "Something went wrong" error.', async () => {
        // Act
        await Checkout.load({
            ...checkoutInfo,
            patchCheckoutError: 'SERVER'
        });
        await Checkout.goToPayment();
        await browser.pause(500);

        // Assert
        await browser.percyScreenshot('f-checkout - Collection - Authenticated - "Something went wrong" Error', 'desktop');
    });

    it('should display the "Restaurant not taking orders" modal', async () => {
        // Act
        await Checkout.load({
            ...checkoutInfo,
            patchCheckoutError: 'restaurant-not-taking-orders'
        });
        await Checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Collection - Authenticated - "Restaurant not taking orders" Error Modal', 'desktop');
    });

    it('should display the "Additional Items Required" modal', async () => {
        // Act
        await Checkout.load({
            ...checkoutInfo,
            patchCheckoutError: 'additional-items-required'
        });
        await Checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Collection - Authenticated - "Additional Items Required" Error Modal', 'desktop');
    });

    it('should display the illegal mobile number error message', async () => {
        // Act
        await Checkout.clearBlurField('mobileNumber');
        await Checkout.setFieldValue('mobileNumber', illegalMobileNumber);
        await Checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Collection - Authenticated - Illegal Mobile Number Error State', 'desktop');
    });

    it('should display the "Duplicate Order Warning" modal', async () => {
        // Act
        await Checkout.load({
            ...checkoutInfo,
            placeOrderError: 'duplicate'
        });
        await Checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Collection - Authenticated - "Duplicate Order Warning" Modal', 'desktop');
    });
});

describe('f-checkout - Collection - Authenticated - isAsapAvailable: false Desktop Visual Tests', () => {
    beforeEach(async () => {
        // Act
        await Checkout.load({
            serviceType: 'collection',
            isLoggedIn: true,
            isAsapAvailable: false,
            locale: 'en-GB'
        });
    });

    it('should display the pre-order warning.', async () => {
        // Assert
        await browser.percyScreenshot('f-checkout - Collection - Authenticated - Pre-Order Warning', 'desktop');
    });
});

describe('f-checkout - Delivery - Authenticated - Desktop Visual Tests', () => {
    const checkoutInfo = {
        serviceType: 'delivery',
        isLoggedIn: true,
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
        await browser.percyScreenshot('f-checkout - Delivery - Authenticated - Base State', 'desktop');
    });


    tests = [
        'addressLine1',
        'addressLocality',
        'mobileNumber',
        'addressPostcode'
    ];

    tests.forEach(field => {
        it('should display the mandatory error messages', async () => {
            // Act
            await Checkout.clearBlurField(field);
            await Checkout.goToPayment();

            // Assert
            await browser.percyScreenshot(`f-checkout - Delivery - Authenticated - Manadatory Error - ${field}`, 'desktop');
        });
    });

    it('should display the illegal postcode error message', async () => {
        // Arrange
        const addressPostcode = 'TEST1A';

        // Act
        await Checkout.clearBlurField('addressPostcode');
        await Checkout.setFieldValue('addressPostcode', addressPostcode);
        await Checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Delivery - Authenticated - Illegal Postcode Error State', 'desktop');
    });

    it('should display the illegal mobile number error message', async () => {
        // Act
        await Checkout.clearBlurField('mobileNumber');
        await Checkout.setFieldValue('mobileNumber', illegalMobileNumber);
        await Checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Delivery - Authenticated - Illegal Mobile Number Error State', 'desktop');
    });

    it('should display the "Duplicate Order Warning" modal', async () => {
        // Act
        await Checkout.load({
            ...checkoutInfo,
            placeOrderError: 'duplicate'
        });
        await Checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Duplicate Order Warning" Modal', 'desktop');
    });

    it('should display the two notes fields if there is two noteTypes.', async () => {
        // Act
        await Checkout.load({
            ...checkoutInfo,
            noteType: 'get-notes-config-split'
        });

        // Assert
        await browser.percyScreenshot('f-checkout - Delivery - Authenticated - Base State - Two Notes Inputs', 'desktop');
    });
});

describe('f-checkout - Delivery - Authenticated - isAsapAvailable: false Desktop Visual Tests', () => {
    beforeEach(async () => {
        // Act
        await Checkout.load({
            serviceType: 'delivery',
            isLoggedIn: true,
            isAsapAvailable: false,
            locale: 'en-GB'
        });
    });

    it('should display the pre-order warning.', async () => {
        // Assert
        await browser.percyScreenshot('f-checkout - Delivery - Authenticated - Pre-Order Warning', 'desktop');
    });
});

describe('f-checkout - Dine In - Authenticated - Desktop Visual Tests', () => {
    const checkoutInfo = {
        serviceType: 'dinein',
        isLoggedIn: true,
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
        await browser.percyScreenshot('f-checkout - Dine in - Authenticated - Base State', 'desktop');
    });

    it('should display the mandatory error messages', async () => {
        // Act
        ['tableIdentifier', 'mobileNumber'].forEach(async field => Checkout.clearBlurField(field));
        await Checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Dine In - Authenticated - Manadatory Errors', 'desktop');
    });

    it('should display the illegal mobile number error message', async () => {
        // Act
        await Checkout.clearBlurField('mobileNumber');
        await Checkout.setFieldValue('mobileNumber', illegalMobileNumber);
        await Checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Dine In - Authenticated - Illegal Mobile Number Error State', 'desktop');
    });

    it('should display the "Duplicate Order Warning" modal', async () => {
        // Act
        await Checkout.load({
            ...checkoutInfo,
            placeOrderError: 'duplicate'
        });
        await Checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Dine in - Authenticated - "Duplicate Order Warning" Modal', 'desktop');
    });

    it('should display the two notes fields if there is two noteTypes.', async () => {
        // Arrange
        await Checkout.load({
            ...checkoutInfo,
            noteType: 'get-notes-config-split'
        });

        // Assert
        await browser.percyScreenshot('f-checkout - Collection - Authenticated - Base State - Two Notes Inputs', 'desktop');
    });
});

describe('f-checkout - Delivery - AU Tenant - visibile state field - Desktop Visual Tests', () => {
    beforeEach(async () => {
        // Act
        await Checkout.load({
            serviceType: 'delivery',
            isLoggedIn: true,
            isAsapAvailable: false,
            locale: 'en-AU'
        });
    });

    it('should display the state input.', async () => {
        // Assert
        await browser.percyScreenshot('f-checkout - Delivery - Authenticated - Visible State field', 'desktop');
    });
});

describe('f-checkout - Delivery - AU Tenant - age verification page - Desktop Visual Tests', () => {
    beforeEach(() => {
        // Act
        Checkout.load({
            serviceType: 'delivery',
            isLoggedIn: true,
            isAsapAvailable: true,
            locale: 'en-AU',
            getBasketError: 'age-restriction'
        });
    });

    it('should display the age verification page', async () => {
        // Assert
        await browser.percyScreenshot('f-checkout - Delivery - Authenticated - Visible Age Verification', 'desktop');
    });
});
