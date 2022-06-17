import forEach from 'mocha-each';

const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

const checkoutInfo = {
    serviceType: 'delivery',
    isLoggedIn: true,
    isAsapAvailable: true,
    locale: 'en-GB'
};

const orderTime = 'Wednesday 01:45';

describe('f-checkout component tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout();

        // Act
        checkout.load({
            ...checkoutInfo
        });
    });

    it('should submit the checkout form', () => {
        // Arrange
        const orderNote = 'Doorbell is broken';
        // Act
        checkout.setFieldValue('orderNote', orderNote);
        checkout.selectOrderTime(orderTime);
        checkout.goToPayment();

        // Assert
        // Waiting for route here, so we can grab redirect url and show form submits.
    });

    forEach([
        [100, 'addressLine1'],
        [100, 'addressLine2'],
        [50, 'addressLocality'],
        [50, 'addressPostcode'],
        [16, 'mobileNumber']
    ])
        .it('should prevent a user from entering more than "%s" characters in the "%s" field', (maxlength, field) => {
            // Arrange
            checkout.clearBlurField(field);
            const userEntry = 'A'.repeat(maxlength + 1); // Enter more than allowed

            // Act
            checkout.setFieldValue(field, userEntry);

            // Assert
            expect(checkout.getFieldValue(field).length).toEqual(maxlength);
        });

    it('should enable a user to submit without adding a note', () => {
        // Act
        checkout.selectOrderTime(orderTime);
        checkout.goToPayment();

        // Assert
        // Waiting for route here, so we can grab redirect url and show form submits.
    });

    it('should close the checkout error when "Retry" is clicked', () => {
        // Arrange
        checkout = new Checkout();

        // Act
        checkout.load({
            ...checkoutInfo,
            patchCheckoutError: 'restaurant-not-taking-orders'
        });

        checkout.goToPayment();
        checkout.clickRetryButton();
        browser.pause(2000);

        // Assert
        expect(checkout.isCheckoutErrorMessageDisplayed()).toBe(false);
    });

    describe('when the "Duplicate Order Warning" modal is displayed', () => {
        beforeEach(() => {
            // Arrange
            checkout = new Checkout();

            // Act
            checkout.load({
                ...checkoutInfo,
                placeOrderError: 'duplicate'
            });

            checkout.goToPayment();
        });

        it('should close the modal and remain on the "Checkout Page" when the "Close" button is pressed', () => {
            // Act
            checkout.waitForComponent();
            checkout.clickRetryButton();

            // Assert
            expect(checkout.isCheckoutErrorMessageDisplayed()).toBe(false);
            expect(checkout.isComponentDisplayed()).toBe(true);
        });

        it('should attempt to redirect to the "Order History Page" when the "View my orders" button is pressed', () => {
            // Act
            checkout.waitForComponent();
            checkout.clickDupOrderGoToHistoryButton();

            // Assert
            expect(browser.getUrl().split('/')[3]).toBe('order-history');
        });
    });
});
