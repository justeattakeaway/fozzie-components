import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
    mounted: () => document.dispatchEvent(new Event('x-app-rendered')),
    render: h => h(App)
}).$mount('#cookie-banner');
