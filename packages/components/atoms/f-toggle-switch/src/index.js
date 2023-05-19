
/**
 * @overview Fozzie Toggle Switch Component JS Wrapper
 *
 * @module f-toggle-switch
 */

// Import vue component
import ToggleSwitch from '@/components/ToggleSwitch.vue';

// Declare install function executed by Vue.use()
export function install (Vue) {
    if (install.installed) return;
    install.installed = true;
    Vue.component('ToggleSwitch', ToggleSwitch);
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
export default ToggleSwitch;
