import forEach from 'mocha-each';

const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;
let checkoutInfo;

describe('f-checkout component tests', () => {
    beforeEach(() => {
        checkout = new Checkout(Checkout.mode.guestUser);
        checkoutInfo = {
            serviceType: 'delivery',
            isAuthenticated: true
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Is ASAP available', true);

        checkout.load();
    });

    it.skip('should submit the checkout form', () => {
        // Arrange
        const customerInfo = {
            note: 'Doorbell is broken',
            orderTime: 'Wednesday 00:30'
        };

        // Act
        checkout.populateCheckoutForm(checkoutInfo, customerInfo);
        checkout.goToPayment();

        // Assert
        // Waiting for route here, so we can grab redirect url and show form submits.
    });

    forEach([
        [100, 'addressLine1'],
        [100, 'addressLine2'],
        [50, 'addressLocality'],
        [50, 'addressPostcode'],
        [16, 'mobileNumber'],
        [200, 'userNote']
    ])
        .it('should prevent a user from entering more than "%s" characters in the "%s" field', (maxlength, field) => {
            // Arrange
            checkout.clearCheckoutField(field);
            const userEntry = 'A'.repeat(maxlength + 1); // Enter more than allowed

            // Act
            checkout.setFieldValue(field, userEntry);

            // Assert
            expect(checkout.getFieldValue(field).length).toEqual(maxlength);
        });

    it.skip('should enable a user to submit without adding a note', () => {
        // Arrange
        const customerInfo = {
            orderTime: 'Wednesday 00:30'
        };

        // Act
        checkout.populateCheckoutForm(checkoutInfo, customerInfo);
        checkout.goToPayment();

        // Assert
        // Waiting for route here, so we can grab redirect url and show form submits.
    });

    it('should close the checkout error when "Retry" is clicked', () => {
        const checkoutLoggedIn = new Checkout(Checkout.mode.fullUser);

        // Arrange
        checkoutLoggedIn.withQuery('&knob-Patch Checkout Errors', 'restaurant-not-taking-orders');

        // Act
        checkoutLoggedIn.load();
        checkoutLoggedIn.goToPayment();
        checkoutLoggedIn.clickRetryButton();
        browser.pause(2000);

        // Assert
        expect(checkoutLoggedIn.isCheckoutErrorMessageDisplayed()).toBe(false);
    });

    describe('when the "Duplicate Order Warning" modal is displayed', () => {
        const checkoutFullUser = new Checkout(Checkout.mode.fullUser);

        beforeEach(() => {
            // Arrange
            checkoutFullUser.withQuery('&knob-Place Order Errors', 'duplicate');

            // Act
            checkoutFullUser.load();
            checkoutFullUser.goToPayment();
        });

        it('should close the modal and remain on the "Checkout Page" when the "Close" button is pressed', () => {
            // Act
            checkoutFullUser.waitForComponent();
            checkoutFullUser.clickRetryButton();

            // Assert
            expect(checkoutFullUser.isCheckoutErrorMessageDisplayed()).toBe(false);
            expect(checkoutFullUser.isCheckoutPageDisplayed()).toBe(true);
        });

        it.only('should attempt to redirect to the "Order History Page" when the "View my orders" button is pressed', () => {
            // Act
            checkout.waitForComponent();
            checkout.clickDupOrderGoToHistoryButton();

            // Assert
            expect(browser.getUrl().split('/')[3]).toBe('order-history');
        });
    });
});
