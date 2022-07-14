import Checkout from '../../test-utils/component-objects/f-checkout.component';

let tests;

const checkoutInfo = {
    serviceType: 'delivery',
    isLoggedIn: true,
    isAsapAvailable: true,
    locale: 'en-GB'
};

const orderTime = 'Wednesday 01:45';

describe('f-checkout component tests', () => {
    beforeEach(async () => {
        // Act
        await Checkout.load({
            ...checkoutInfo
        });
    });

    it.skip('should submit the checkout form', async () => {
        // Arrange
        const orderNote = 'Doorbell is broken';
        // Act
        await Checkout.setFieldValue('orderNote', orderNote);
        await Checkout.selectOrderTime(orderTime);
        await Checkout.goToPayment();

        // Assert
        // Waiting for route here, so we can grab redirect url and show form submits.
    });

    tests = [
        { maxLength: 100, field: 'addressLine1' },
        { maxLength: 100, field: 'addressLine2' },
        { maxLength: 50, field: 'addressLocality' },
        { maxLength: 50, field: 'addressPostcode' },
        { maxLength: 16, field: 'mobileNumber' }
    ];

    tests.forEach(({ maxLength, field }) => {
        it(`should prevent a user from entering more than "${maxLength}" characters in the "${field}" field`, async () => {
            // Arrange
            await Checkout.clearBlurField(field);
            const userEntry = 'A'.repeat(maxLength + 1); // Enter more than allowed

            // Act
            await Checkout.setFieldValue(field, userEntry);
            await Checkout.goToPayment();

            // Assert
            await expect((await Checkout.getFieldValue(field)).length).toEqual(maxLength);
        });
    });

    it.skip('should enable a user to submit without adding a note', async () => {
        // Act
        await Checkout.selectOrderTime(orderTime);
        await Checkout.goToPayment();

        // Assert
        // Waiting for route here, so we can grab redirect url and show form submits.
    });

    it('should close the checkout error when "Retry" is clicked', async () => {
        // Act
        await Checkout.load({
            ...checkoutInfo,
            patchCheckoutError: 'restaurant-not-taking-orders'
        });

        await Checkout.goToPayment();
        await Checkout.clickRetryButton();
        await browser.pause(2000);

        // Assert
        await expect(await Checkout.isCheckoutErrorMessageDisplayed()).toBe(false);
    });

    describe('when the "Duplicate Order Warning" modal is displayed', () => {
        beforeEach(async () => {
            // Act
            await Checkout.load({
                ...checkoutInfo,
                placeOrderError: 'duplicate'
            });

            await Checkout.goToPayment();
        });

        it('should close the modal and remain on the "Checkout Page" when the "Close" button is pressed', async () => {
            // Act
            await Checkout.waitForComponent();
            await Checkout.clickRetryButton();

            // Assert
            await expect(await Checkout.isCheckoutErrorMessageDisplayed()).toBe(false);
            await expect(await Checkout.isComponentDisplayed()).toBe(true);
        });

        it('should attempt to redirect to the "Order History Page" when the "View my orders" button is pressed', async () => {
            // Act
            await Checkout.waitForComponent();
            await Checkout.clickDupOrderGoToHistoryButton();

            // Assert
            await expect((await browser.getUrl()).split('/')[3]).toBe('order-history');
        });
    });
});
