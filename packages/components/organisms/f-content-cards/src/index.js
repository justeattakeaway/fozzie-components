/**
 * @overview Fozzie f-content-cards Component JS Wrapper
 *
 * @module f-content-cards
 */

import globalThis from 'core-js/features/global-this';
// Import vue component
import ContentCards from '@/components/ContentCards.vue';

export { CARDSOURCE_METADATA, CARDSOURCE_CUSTOM } from '@/components/ContentCards.vue';

// Declare install function executed by Vue.use()
export function install (Vue) {
    if (install.installed) return;
    install.installed = true;
    Vue.component('ContentCards', ContentCards);
}

// Create module definition for Vue.use()
const plugin = {
    install
};

// Auto-install when vue is found (eg. in browser via <script> tag)
const GlobalVue = globalThis?.Vue;

if (GlobalVue?.use) {
    GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export component
export default ContentCards;
