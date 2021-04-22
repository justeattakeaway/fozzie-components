import forEach from 'mocha-each';

const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const Checkout = require('../../../test-utils/component-objects/f-checkout.component');

const checkout = new Checkout('organism', 'checkout-component');

describe('f-checkout "collection" component tests - @browserstack', () => {
    beforeEach(() => {
        checkout.withQuery('&knob-Service Type', 'collection')
                .withQuery('&knob-Is User Logged In', true);

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

        checkout.open(pageUrl)
            .waitForComponent();
    });

    forEach(['addressLine1', 'addressLine2', 'addressLocality', 'addressPostcode'])
    .it('should check that address fields should not exist', field => {
        // Assert
        expect(checkout.doesFieldExist(field)).toBe(false);
    });
});
