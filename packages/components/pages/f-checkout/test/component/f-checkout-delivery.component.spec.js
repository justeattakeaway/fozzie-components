const Checkout = require('../../test-utils/component-objects/f-checkout.component');


let checkout;

describe('f-checkout "delivery" component tests', () => {
    describe('uk tenant', () => {
        beforeEach(() => {
            checkout = new Checkout();
            checkout.withQuery('&knob-Service Type', 'delivery')
                .withQuery('&knob-Is User Logged In', true)
                .withQuery('&knob-Is ASAP available', true);

            checkout.load();
        });

        it('should enable a user to submit a postcode with correct characters', () => {
            // Act
            checkout.goToPayment();

            // Assert
            expect(checkout.isPostcodeTypeErrorDisplayed()).toBe(false);
        });
    });

    describe('au tenant', () => {
        describe('and age verification is not required', () => {
            beforeEach(() => {
                checkout = new Checkout();
                checkout.withQuery('&knob-Service Type', 'delivery')
                    .withQuery('&knob-Is User Logged In', false)
                    .withQuery('&knob-Is ASAP available', true)
                    .withQuery('&knob-Locale', 'en-AU');

                checkout.load();
            });

            it('should prevent more than 50 characters in state field', () => {
                // Arrange
                const field = 'addressAdministrativeArea';
                const userEntry = 'A'.repeat(50 + 1); // Enter more than allowed

                // Act
                checkout.setFieldValue(field, userEntry);

                // Assert
                expect(checkout.getFieldValue(field).length).toEqual(50);
            });
        });
    });
});
