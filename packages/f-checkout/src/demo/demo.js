import Vue from 'vue';
import Vuex from 'vuex';
import { VueI18n } from '@justeat/f-globalisation';
import VueDemo from './Demo.vue';
import { ENGLISH_LOCALE } from '../../../storybook/constants/globalisation';
import CheckoutMock from './checkoutMock';

CheckoutMock.setupCheckoutMethod('/checkout-delivery.json');

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
    components: { VueDemo },
    render: h => h(VueDemo)
}).$mount('#app');
