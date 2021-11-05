const Checkout = require('../../test-utils/component-objects/f-checkout.component');


let checkout;

describe('f-checkout "delivery" component tests', () => {
    // describe('uk tenant', () => {
    //     beforeEach(() => {
    //         checkout = new Checkout();
    //         checkout.withQuery('&knob-Service Type', 'delivery')
    //             .withQuery('&knob-Is User Logged In', true)
    //             .withQuery('&knob-Is ASAP available', true);

    //         checkout.load();
    //     });

    //     it('should enable a user to submit a postcode with correct characters', () => {
    //         // Act
    //         checkout.goToPayment();

    //         // Assert
    //         expect(checkout.isPostcodeTypeErrorDisplayed()).toBe(false);
    //     });
    // });

    describe('au tenant', () => {
        // describe('and age verification is not required', () => {
        //     beforeEach(() => {
        //         checkout = new Checkout();
        //         checkout.withQuery('&knob-Service Type', 'delivery')
        //             .withQuery('&knob-Is User Logged In', false)
        //             .withQuery('&knob-Is ASAP available', true)
        //             .withQuery('&knob-Locale', 'en-AU');

        //         checkout.load();
        //     });

        //     it('should prevent more than 50 characters in state field', () => {
        //         // Arrange
        //         const field = 'addressAdministrativeArea';
        //         const userEntry = 'A'.repeat(50 + 1); // Enter more than allowed

        //         // Act
        //         checkout.setFieldValue(field, userEntry);

        //         // Assert
        //         expect(checkout.getFieldValue(field).length).toEqual(50);
        //     });
        // });

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

            it('should display a field error if the customer is younger than 18', () => {
                // const dob = {
                //     day: 5,
                //     month: 7,
                //     year: 2017
                // };

                checkout.isAgeVerificationDisplayed();
            });
        });
    });
});
