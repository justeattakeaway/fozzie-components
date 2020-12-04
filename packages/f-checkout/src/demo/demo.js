import initialiseDemo from '../../../../services/f-development-context/webdriver.entry';

import VueCheckout from '../components/Checkout.vue';
import CheckoutMock from './checkoutMock';

CheckoutMock.setupDelivery('/checkout-delivery.json');

const props = {
    checkoutUrl: '/checkout-delivery.json'
};

initialiseDemo(VueCheckout, props);
