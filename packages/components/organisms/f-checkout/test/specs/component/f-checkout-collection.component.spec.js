import forEach from 'mocha-each';

const Checkout = require('../../../test-utils/component-objects/f-checkout.component');
const buildUrl = require('../../../../../../services/f-wdio-utils/src/storybook-extensions.js');

const checkout = new Checkout();

describe('f-checkout "collection" component tests', () => {
    before(() => {
        checkout.withQuery('knob-Service Type', 'collection')
                .withQuery('knob-Is User Logged In', true);

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

        checkout.open(pageUrl)
            .waitForComponent();
    });

    forEach(['addressLine1', 'addressLine2', 'addressCity', 'addressPostcode'])
    .it.only('should check that address fields should not exist', field => {
        // Assert
        expect(checkout.doesFieldExist(field)).toBe(false);
    });
});
