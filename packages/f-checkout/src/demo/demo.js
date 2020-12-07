import initialise from '@justeat/f-development-context';

import VueCheckout from '../components/Checkout.vue';
import CheckoutMock from './checkoutMock';

CheckoutMock.setupCheckoutMethod('/checkout-delivery.json');

const props = {
    checkoutUrl: '/checkout-delivery.json'
};

initialise(VueCheckout, props);
