const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const Checkout = require('../../test-utils/component-objects/f-checkout.component');


let checkout;

describe('f-checkout "delivery" component tests', () => {
    describe('uk tenant', () => {
        beforeEach(() => {
            checkout = new Checkout();
            checkout.withQuery('&knob-Service Type', 'delivery')
                .withQuery('&knob-Is User Logged In', true)
                .withQuery('&knob-Is ASAP available', true);

            const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

            checkout.open(pageUrl);
            checkout.waitForComponent();
        });

        it('should enable a user to submit a postcode with correct characters', () => {
            // Arrange
            const addressInfo = {
                postcode: 'AR51 1AA'
            };

            // Act
            checkout.clearBlurField('addressPostcode');
            checkout.populateCheckoutForm(addressInfo);
            checkout.goToPayment();

            // Assert
            expect(checkout.isPostcodeTypeErrorDisplayed()).toBe(false);
        });
    });

    describe('au tenant', () => {
        beforeEach(() => {
            checkout = new Checkout();
            checkout.withQuery('&knob-Service Type', 'delivery')
                .withQuery('&knob-Is User Logged In', true)
                .withQuery('&knob-Is ASAP available', true)
                .withQuery('&knob-Locale', 'en-AU');

            const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

            checkout.open(pageUrl);
            checkout.waitForComponent();
        });

        it('should prevent more than 50 characters in state field', () => {
            // Arrange
            const field = 'addressAdministrativeArea';
            checkout.clearCheckoutForm(field);
            const userEntry = 'A'.repeat(50 + 1); // Enter more than allowed

            // Act
            checkout.setFieldValue(field, userEntry);

            // Assert
            expect(checkout.getFieldValue(field).length).toEqual(50);
        });
    });
});
