
/**
 * @overview Fozzie Takeawaypay Activation Component JS Wrapper
 *
 * @module f-takeawaypay-activation
 */


// Import vue component
import TakeawaypayActivation from '@/components/TakeawaypayActivation.vue';

// Declare install function executed by Vue.use()
export function install (Vue) {
    if (install.installed) return;
    install.installed = true;
    Vue.component('TakeawaypayActivation', TakeawaypayActivation);
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
export default TakeawaypayActivation;


