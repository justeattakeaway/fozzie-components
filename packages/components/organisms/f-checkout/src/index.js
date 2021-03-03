/**
 * @overview Fozzie Checkout Component JS Wrapper
 *
 * @module f-checkout
 */


// Import vue component
import VueCheckout from '@/components/Checkout.vue';
import CheckoutModule from '@/store/checkout.module';
import AnalyticsModule from '@/store/analytics.module';

export { CHECKOUT_METHOD_COLLECTION, CHECKOUT_METHOD_DELIVERY } from './constants';

// Declare install function executed by Vue.use()
export function install (Vue) {
    if (install.installed) return;
    install.installed = true;
    Vue.component('VueCheckout', VueCheckout);
}

// Create module definition for Vue.use()
const plugin = {
    install
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}
if (GlobalVue) {
    GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export component
export {
    VueCheckout,
    CheckoutModule,
    AnalyticsModule
};
