import globalThis from 'core-js/features/global-this';

/**
 * @overview Fozzie f-braze-content-cards Component JS Wrapper
 *
 * @module f-braze-content-cards
 */


// Import vue component
import BrazeContentCards from '@/components/BrazeContentCards.vue';

// Declare install function executed by Vue.use()
export function install (Vue) {
    if (install.installed) return;
    install.installed = true;
    Vue.component('BrazeContentCards', BrazeContentCards);
}

// Create module definition for Vue.use()
const plugin = {
    install
};

// Auto-install when vue is found (eg. in browser via <script> tag)
const GlobalVue = globalThis?.window?.Vue || globalThis?.Vue || null;

if (GlobalVue?.use) {
    GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export component
export default BrazeContentCards;
