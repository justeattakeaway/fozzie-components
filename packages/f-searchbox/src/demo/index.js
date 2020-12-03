import Vue from 'vue';
import Vuex from 'vuex';
import { VueI18n } from '@justeat/f-globalisation';
import VueSearchBox from '../components/Base.vue';

Vue.use(Vuex);
Vue.use(VueI18n);
Vue.config.productionTip = false;

const i18n = new VueI18n({
    locale: 'es-ES',
    messages: {}
});

/* eslint-disable no-new */
new Vue({
    i18n,
    store: new Vuex.Store({}),
    render: h => h(VueSearchBox, {
        props: {
            copyOverride: {}
        }
    })
}).$mount('#app');
