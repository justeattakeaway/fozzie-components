import CheckoutComponent from '../../../test-utils/component-objects/f-checkout.component';

describe('f-checkout guest component tests', () => {
    before(() => {
        browser.url('?path=/story/components-organisms--checkout-component&knob-Auth token=');
        browser.switchToFrame(0);
        CheckoutComponent.waitForCheckoutComponent();
        CheckoutComponent.waitForCheckoutComponentGuest();
    });

    it('should navigate to login when the login / sign up link is clicked', () => {
        const loginPath = '/login';

        CheckoutComponent.clickGuestLoginLink();
        const { pathname } = new URL(browser.getUrl());

        expect(pathname).toEqual(loginPath);
    });
});
