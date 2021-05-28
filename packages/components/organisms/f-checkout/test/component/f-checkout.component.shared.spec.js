import forEach from 'mocha-each';

const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
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
        [16, 'mobileNumber'],
        [200, 'userNote']
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
        checkout.withQuery('&knob-Checkout Errors', 'ISSUES');
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
});
