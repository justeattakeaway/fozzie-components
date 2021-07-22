import forEach from 'mocha-each';

const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

describe('f-checkout component tests - @browserstack', () => {
    beforeEach(() => {
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'delivery')
            .withQuery('&knob-Is User Logged In', true)
            .withQuery('&knob-Is ASAP available', true);

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

        checkout.open(pageUrl);
        checkout.waitForComponent();
    });

    it.skip('should submit the checkout form', () => {
        // Arrange
        const addressInfo = {
            mobileNumber: '07777777779',
            line1: 'Test House',
            line2: 'High Street',
            locality: 'Test Locality',
            postcode: 'AR51 1AA',
            note: 'Doorbell is broken'
        };

        // Act
        checkout.populateCheckoutForm(addressInfo);
        checkout.selectOrderTime('Wednesday 00:30');
        checkout.goToPayment();

        // Assert
        // Waiting for route here, so we can grab redirect url and show form submits.
    });

    forEach([
        [255, 'addressLine1'],
        [255, 'addressLine2'],
        [50, 'addressLocality'],
        [50, 'addressPostcode'],
        [16, 'mobileNumber']
    ])
        .it('should prevent a user from entering more than "%s" characters in the "%s" field', (maxlength, field) => {
            // Arrange
            checkout.clearCheckoutForm(field);
            const userEntry = 'A'.repeat(maxlength + 1); // Enter more than allowed

            // Act
            checkout.setFieldValue(field, userEntry);

            // Assert
            expect(checkout.getFieldValue(field).length).toEqual(maxlength);
        });

    it('should prevent a user from entering more than 250 characters in the notes field', () => {
        // Arrange
        const field = 'restaurantNote';
        const maxlength = 200;

        const userEntry = 'A'.repeat(maxlength + 1); // Enter more than allowed

        // Act
        checkout.expandAndPopulateNote('restaurant', userEntry);

        // Assert
        expect(checkout.getFieldValue(field).length).toEqual(maxlength);
    });

    it.skip('should enable a user to submit without adding a note', () => {
        // Arrange
        const addressInfo = {
            mobileNumber: '07777777779',
            line1: 'Test House',
            line2: 'High Street',
            locality: 'Test Locality',
            postcode: 'AR51 1AA',
            note: ''
        };

        // Act
        checkout.populateCheckoutForm(addressInfo);
        checkout.selectOrderTime('Wednesday 00:30');
        checkout.goToPayment();

        // Assert
        // Waiting for route here, so we can grab redirect url and show form submits.
    });

    it('should close the checkout error when "Retry" is clicked', () => {
        // Arrange
        checkout.withQuery('&knob-Patch Checkout Errors', 'restaurant-not-taking-orders');
        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

        // Act
        checkout.open(pageUrl);
        checkout.waitForComponent();
        checkout.goToPayment();
        checkout.clickRetryButton();
        browser.pause(2000);

        // Assert
        expect(checkout.isCheckoutErrorMessageDisplayed()).toBe(false);
    });

    describe('when the "Duplicate Order Warning" modal is displayed', () => {
        beforeEach(() => {
            // Arrange
            checkout.withQuery('&knob-Place Order Errors', 'duplicate');
            const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

            // Act
            checkout.open(pageUrl);
            checkout.waitForComponent();
            checkout.goToPayment();
        });

        it('should close the modal and remain on the "Checkout Page" when the "Close" button is pressed', () => {
            // Act
            checkout.waitForComponent();
            checkout.clickRetryButton();

            // Assert
            expect(checkout.isCheckoutErrorMessageDisplayed()).toBe(false);
            expect(checkout.isCheckoutPageDisplayed()).toBe(true);
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
