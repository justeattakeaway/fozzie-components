import forEach from 'mocha-each';

const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');

const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

describe('f-checkout "guest" component tests - @browserstack', () => {
    beforeEach(() => {
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'delivery')
                .withQuery('&knob-Is User Logged In', false)
                .withQuery('&knob-Is ASAP available', true);

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

        checkout.open(pageUrl);
        checkout.waitForComponent();
    });

    it('should navigate to correct url when the login link is clicked', () => {
        // Arrange
        const loginPath = '/login';

        // Act
        checkout.clickGuestCheckoutLoginButton();
        const { pathname } = new URL(browser.getUrl());

        // Assert
        expect(pathname).toEqual(loginPath);
    });

    forEach([
        [100, 'firstName'],
        [100, 'lastName']
    ])
    .it('should prevent a user from entering more than "%s" characters in the "%s" field', (maxlength, field) => {
        // Arrange
        checkout.clearCheckoutForm(field);
        const userEntry = 'A'.repeat(maxlength + 1); // Enter more than allowed

        // Act
        checkout.setFieldValue(field, userEntry);

        // Assert
        expect(checkout.getFieldValue(field).length).toEqual(maxlength);
    });
});
