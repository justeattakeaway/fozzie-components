/**
 * @overview Fozzie GTM / GA Analytics JS Wrapper
 *
 * @module f-analytics
 */

import AnalyticsMixin from './mixins/analytics.mixin.vue';
import AnalyticsPlugin from './plugins/analytics.plugin';

export function install (Vue) {
    if (install.installed) {
        return;
    }
    install.installed = true;
    Vue.component('Analytics', AnalyticsMixin);
}

const plugin = {
    install
};

let GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}
if (GlobalVue) {
    GlobalVue.use(plugin);
}

export { AnalyticsMixin, AnalyticsPlugin };
