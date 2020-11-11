import Vue from 'vue';
import { VueI18n } from '@justeat/f-globalisation';
import VueCheckout from '../components/Checkout.vue';
import { ENGLISH_LOCALE } from '../../../storybook/constants/globalisation';

Vue.config.productionTip = false;

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: ENGLISH_LOCALE,
    fallbackLocale: ENGLISH_LOCALE,
    messages: {}
});

/* eslint-disable no-new */
new Vue({
    i18n,
    render: h => h(VueCheckout, {
        props: {
            checkoutMethod: 'Delivery'
        }
    })
}).$mount('#app');
