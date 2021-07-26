const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const Checkout = require('../../test-utils/component-objects/f-checkout.component');


let checkout;

describe('f-checkout "delivery" component tests', () => {
    beforeEach(() => {
        checkout = new Checkout('organism', 'checkout-component');
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
        checkout.populateCheckoutForm(addressInfo);
        checkout.goToPayment();

        // Assert
        expect(checkout.isPostcodeTypeErrorDisplayed()).toBe(false);
    });

    it('should open the combined notes accordion and populate it', () => {
        // Combined notes are named delivery until the new API spec is released
        checkout.expandAndPopulateNote('delivery', 'This is a combined note');

        checkout.goToPayment();
    });
});

describe('f-checkout "delivery" - split notes - component tests', () => {
    beforeEach(() => {
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'delivery')
                .withQuery('&knob-Is User Logged In', true)
                .withQuery('&knob-Is ASAP available', true)
                .withQuery('&knob-Note types', '-split-notes-delivery-kitchen');

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

        checkout.open(pageUrl);
        checkout.waitForComponent();
    });

    it('should open both delivery and kitchen notes accordions and populate them', () => {
        // Assert
        checkout.expandAndPopulateNote('delivery', 'This is a delivery note');
        checkout.expandAndPopulateNote('kitchen', 'This is a kitchen note');
        checkout.goToPayment();
    });
});
