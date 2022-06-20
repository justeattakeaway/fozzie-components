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

    it('should submit the checkout form', async () => {
        // Arrange
        const orderNote = 'Doorbell is broken';
        // Act
        await checkout.setFieldValue('orderNote', orderNote);
        await checkout.selectOrderTime(orderTime);
        await checkout.goToPayment();

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
        .it('should prevent a user from entering more than "%s" characters in the "%s" field', async (maxlength, field) => {
            // Arrange
            await checkout.clearBlurField(field);
            const userEntry = await 'A'.repeat(maxlength + 1); // Enter more than allowed

            // Act
            await checkout.setFieldValue(field, userEntry);
            await checkout.goToPayment();

            // Assert
            await expect((await checkout.getFieldValue(field)).length).toEqual(maxlength);
        });

    it('should enable a user to submit without adding a note', async () => {
        // Act
        await checkout.selectOrderTime(orderTime);
        await checkout.goToPayment();

        // Assert
        // Waiting for route here, so we can grab redirect url and show form submits.
    });

    it('should close the checkout error when "Retry" is clicked', async () => {
        // Arrange
        checkout = new Checkout();

        // Act
        checkout.load({
            ...checkoutInfo,
            patchCheckoutError: 'restaurant-not-taking-orders'
        });

        await checkout.goToPayment();
        await checkout.clickRetryButton();
        await browser.pause(2000);

        // Assert
        await expect(await checkout.isCheckoutErrorMessageDisplayed()).toBe(false);
    });

    describe('when the "Duplicate Order Warning" modal is displayed', () => {
        beforeEach(async () => {
            // Arrange
            checkout = new Checkout();

            // Act
            checkout.load({
                ...checkoutInfo,
                placeOrderError: 'duplicate'
            });

            await checkout.goToPayment();
        });

        it('should close the modal and remain on the "Checkout Page" when the "Close" button is pressed', async () => {
            // Act
            await checkout.waitForComponent();
            await checkout.clickRetryButton();

            // Assert
            await expect(await checkout.isCheckoutErrorMessageDisplayed()).toBe(false);
            await expect(await checkout.isComponentDisplayed()).toBe(true);
        });

        it('should attempt to redirect to the "Order History Page" when the "View my orders" button is pressed', async () => {
            // Act
            await checkout.waitForComponent();
            await checkout.clickDupOrderGoToHistoryButton();

            // Assert
            await expect((await browser.getUrl()).split('/')[3]).toBe('order-history');
        });
    });
});
