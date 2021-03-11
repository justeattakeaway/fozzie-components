import forEach from 'mocha-each';

const Checkout = require('../../../test-utils/component-objects/f-checkout.component');
const buildUrl = require('../../../../../../services/f-wdio-utils/src/storybook-extensions.js');

const checkout = new Checkout();

describe('f-checkout "delivery" component tests', () => {
    before(() => {
        checkout.withQuery('knob-Service Type', 'delivery')
                .withQuery('knob-Is User Logged In', true);

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);
        browser.debug();
        checkout.open(pageUrl)
            .waitForComponent();
    });

    forEach(['mobileNumber', 'addressLine1', 'addressCity', 'addressPostcode'])
    .it.only('should display each fields error message', field => {
        // Act
        checkout.clearCheckoutForm(field);
        checkout.goToPayment();

        // Assert
        expect(checkout.isFieldErrorDisplayed(field)).toBe(true);
    });

    forEach(['addressLine1', 'addressLine2', 'addressCity', 'addressPostcode'])
    .it.skip('should check if address fields exist', field => {
        // Assert
        expect(checkout.doesFieldExist(field)).toBe(true);
    });

    it.skip('should display the mandatory fields', () => {
        // Assert
        expect(checkout.isFieldDisplayed('mobileNumber')).toBe(true);
    });

    it.skip('should prevent user from submitting a postcode with an illegal postcode', () => {
        // Arrange
        const addressInfo = {
            postcode: 'TEST1A'
        };

        // Act
        checkout.populateCheckoutForm(addressInfo);
        checkout.goToPayment();

        // Assert
        expect(checkout.isPostcodeTypeErrorDisplayed()).toBe(true);
    });

    it.skip('should enable a user to submit a postcode with correct characters', () => {
        // Arrange
        const addressInfo = {
            postcode: 'AR51 1AA'
        };

        // Act
        checkout.populateCheckoutForm(addressInfo);
        checkout.goToPayment();

        // Assert
        expect(checkout.isPostcodeTypeErrorDisplayed()).toBe(false);
    });
});
