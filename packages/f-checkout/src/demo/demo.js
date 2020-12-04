import Vue from 'vue';
import VueCheckout from '../components/Checkout.vue';
import CheckoutMock from './checkoutMock';

import i18n from '../../../storybook/context/i18n.context';
import store from '../../../storybook/context/vuex.context';
import '../../../storybook/context/logger.context';
import '../../../storybook/context/cookie.context';

CheckoutMock.setupDelivery('/checkout-delivery.json');

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    i18n,
    store,
    render: h => h(VueCheckout, {
        props: {
            checkoutUrl: '/checkout-delivery.json'
        }
    })
}).$mount('#app');
