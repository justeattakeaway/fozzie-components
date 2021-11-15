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

        it('should open the combined notes accordion and populate it', () => {
            checkout.expandAndPopulateNote('orderAccordionHeader', 'orderNote', 'This is an order note');

            checkout.goToPayment();
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

        describe('and age verification is required', () => {
            beforeEach(() => {
                // Arrange
                checkout = new Checkout();
                const checkoutInfo = {
                    serviceType: 'delivery',
                    isAuthenticated: true,
                    isASAP: true,
                    locale: 'en-AU',
                    restrictions: 'age-restriction'
                };
                checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
                .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
                .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP)
                .withQuery('&knob-Locale', checkoutInfo.locale)
                .withQuery('&knob-Restrictions', checkoutInfo.restrictions);

                checkout.loadAgeVerification();
            });

            it('should display the age verification', () => {
                expect(checkout.isAgeVerificationDisplayed()).toBe(true);
            });

            it('should display a field error if the age is younger than 18', () => {
                const todaysDate = new Date();
                const dob = {
                    day: todaysDate.getDay(),
                    month: todaysDate.toLocaleString('default', { month: 'long' }),
                    year: todaysDate.getFullYear() - 17 // The user is 17 years old
                };

                checkout.populateAgeVerificationForm(dob);
                checkout.ageVerificationSubmitButton.click();
                expect(checkout.isAgeVerificationErrorDisplayed()).toBe(true);
            });
        });
    });
});

describe('f-checkout "delivery" - split notes - component tests', () => {
    beforeEach(() => {
        checkout = new Checkout();
        checkout.withQuery('&knob-Service Type', 'delivery')
                .withQuery('&knob-Is User Logged In', true)
                .withQuery('&knob-Is ASAP available', true)
                .withQuery('&knob-Note types', 'get-notes-config-split');

        checkout.load();
        checkout.waitForComponent();
    });

    it('should open both delivery and kitchen notes accordions and populate them', () => {
        // Assert
        checkout.expandAndPopulateNote('courierAccordionHeader', 'courierNote', 'This is a delivery note');
        checkout.expandAndPopulateNote('kitchenAccordionHeader', 'kitchenNote', 'This is a kitchen note');
        checkout.goToPayment();
    });
});
