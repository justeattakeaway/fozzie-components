import { withA11y } from '@storybook/addon-a11y';
import { CheckoutComponent as GuestCheckoutComponent } from './Checkout/CheckoutGuest.stories';
import { CheckoutComponent as LoggedInCheckout } from './Checkout/CheckoutLoggedIn.stories';

export default {
    title: 'Components/Pages/Checkout',
    decorators: [withA11y]
};

export {
    GuestCheckoutComponent,
    LoggedInCheckout
};
