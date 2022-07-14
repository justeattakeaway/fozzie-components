import Checkout from '../../test-utils/component-objects/f-checkout.component';
import CheckoutAgeVerification from '../../test-utils/component-objects/f-checkout-age-verification';

const checkoutInfo = {
    serviceType: 'delivery',
    isLoggedIn: true,
    isAsapAvailable: true,
    locale: 'en-GB'
};

describe('f-checkout "delivery" component tests', () => {
    describe('uk tenant', () => {
        beforeEach(async () => {
            // Act
            await Checkout.load({
                ...checkoutInfo
            });
        });

        it('should enable a user to submit a postcode with correct characters', async () => {
            // Act
            await Checkout.goToPayment();

            // Assert
            await expect(await Checkout.isPostcodeTypeErrorDisplayed()).toBe(false);
        });
    });

    describe('au tenant', () => {
        describe('and age verification is not required', () => {
            beforeEach(async () => {
                // Act
                await Checkout.load({
                    ...checkoutInfo,
                    isLoggedIn: false,
                    locale: 'en-AU'
                });
            });

            it('should prevent more than 50 characters in state field', async () => {
                // Arrange
                const field = 'addressAdministrativeArea';
                const userEntry = await 'A'.repeat(50 + 1); // Enter more than allowed

                // Act
                await Checkout.setFieldValue(field, userEntry);

                // Assert
                await expect((await Checkout.getFieldValue(field)).length).toEqual(50);
            });
        });

        describe('and age verification is required', () => {
            beforeEach(async () => {
                // Act
                await CheckoutAgeVerification.load({
                    ...checkoutInfo,
                    locale: 'en-AU',
                    getBasketError: 'age-restriction'
                });
            });

            it('should display the age verification', async () => {
                // Assert
                await expect(await CheckoutAgeVerification.isAgeVerificationDisplayed()).toBe(true);
            });

            it('should display a field error if the age is younger than 18', async () => {
                // Arrange
                const todaysDate = new Date();
                const dob = {
                    day: todaysDate.getDay(),
                    month: todaysDate.toLocaleString('default', { month: 'long' }),
                    year: todaysDate.getFullYear() - 17 // The user is 17 years old
                };

                // Act
                await CheckoutAgeVerification.populateAgeVerificationForm(dob);
                await CheckoutAgeVerification.ageVerificationSubmitButton.click();

                // Assert
                await expect(await CheckoutAgeVerification.isAgeVerificationErrorDisplayed()).toBe(true);
            });
        });
    });
});

describe('f-checkout "delivery" - split notes - component tests', () => {
    it.skip('should open the courier and kitchen notes accordions and populate them', async () => {
        // Act
        await Checkout.load({
            ...checkoutInfo,
            noteType: 'get-notes-config-split'
        });

        // Assert
        await Checkout.expandAndPopulateNote('courierAccordionHeader', 'courierNote', 'This is a courier note');
        await Checkout.expandAndPopulateNote('kitchenAccordionHeader', 'kitchenNote', 'This is a kitchen note');
        await Checkout.goToPayment();
    });
});
