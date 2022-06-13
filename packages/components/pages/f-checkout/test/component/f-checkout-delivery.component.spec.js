const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

const checkoutInfo = {
    serviceType: 'delivery',
    isLoggedIn: true,
    isAsapAvailable: true,
    locale: 'en-GB'
};

describe('f-checkout "delivery" component tests', () => {
    describe('uk tenant', () => {
        beforeEach(async () => {
            // Arrange
            checkout = new Checkout();

            // Act
            await checkout.load({
                ...checkoutInfo
            });
        });

        it('should enable a user to submit a postcode with correct characters', async () => {
            // Act
            await checkout.goToPayment();

            // Assert
            await expect(await checkout.isPostcodeTypeErrorDisplayed()).toBe(false);
        });
    });

    describe('au tenant', () => {
        describe('and age verification is not required', () => {
            beforeEach(async () => {
                // Arrange
                checkout = new Checkout();

                // Act
                await checkout.load({
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
                await checkout.setFieldValue(field, userEntry);

                // Assert
                await expect((await checkout.getFieldValue(field)).length).toEqual(50);
            });
        });

        describe('and age verification is required', () => {
            beforeEach(async () => {
                // Arrange
                checkout = new Checkout();

                // Act
                await checkout.load({
                    ...checkoutInfo,
                    locale: 'en-AU',
                    getBasketError: 'age-restriction'
                });
            });

            it('should display the age verification', async () => {
                // Assert
                await expect(await checkout.isAgeVerificationDisplayed()).toBe(true);
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
                await checkout.populateAgeVerificationForm(dob);
                await checkout.ageVerificationSubmitButton.click();

                // Assert
                await expect(await checkout.isAgeVerificationErrorDisplayed()).toBe(true);
            });
        });
    });
});

describe('f-checkout "delivery" - split notes - component tests', () => {
    it('should open the courier and kitchen notes accordions and populate them', async () => {
        // Arrange
        checkout = new Checkout();

        // Act
        await checkout.load({
            ...checkoutInfo,
            noteType: 'get-notes-config-split'
        });

        // Assert
        await checkout.expandAndPopulateNote('courierAccordionHeader', 'courierNote', 'This is a courier note');
        await checkout.expandAndPopulateNote('kitchenAccordionHeader', 'kitchenNote', 'This is a kitchen note');
        await checkout.goToPayment();
    });
});
