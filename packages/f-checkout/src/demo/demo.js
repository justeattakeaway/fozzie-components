import Vue from 'vue';
import Vuex from 'vuex';
import { VueI18n } from '@justeat/f-globalisation';
import VueCheckout from '../components/Checkout.vue';
import { ENGLISH_LOCALE } from '../../../storybook/constants/globalisation';
import CheckoutMock from './checkoutMock';

CheckoutMock.setupDelivery('/checkout-delivery.json');

Vue.config.productionTip = false;

Vue.use(VueI18n);
Vue.use(Vuex);

const i18n = new VueI18n({
    locale: ENGLISH_LOCALE,
    fallbackLocale: ENGLISH_LOCALE,
    messages: {}
});

/* eslint-disable no-new */
new Vue({
    i18n,
    store: new Vuex.Store({}),
    render: h => h(VueCheckout, {
        props: {
            checkoutUrl: '/checkout-delivery.json'
        }
    })
}).$mount('#app');
