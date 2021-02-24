import forEach from 'mocha-each';
import CheckoutComponent from '../../../test-utils/component-objects/f-checkout.component';

describe('f-checkout "collection" component tests', () => {
    before(() => {
        browser.url('iframe.html?id=components-organisms--checkout-component&knob-Get%20Checkout%20Url=%2Fcheckout-collection.json&knob-Available%20Fulfilment%20Url=%2Fcheckout-available-fulfilment.json&knob-Create%20Guest%20Url=%2Fcreate-guest.json&knob-Auth%20token=a&knob-Login%20Url=%2Flogin&knob-Place%20Order%20Url=%2Fplace-order.json&knob-Payment%20Page%20Url%20Prefix=%2Fpay&viewMode=story');
        CheckoutComponent.waitForCheckoutComponent();
    });

    forEach(['addressLine1', 'addressLine2', 'addressCity', 'addressPostcode'])
    .it.only('should check that address fields should not exist', field => {
        // Assert
        expect(CheckoutComponent.doesFieldExist(field)).toBe(false);
    });
});
