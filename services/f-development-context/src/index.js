import Vue from 'vue';

import i18nContext from './i18n.context';
import storeContext from './vuex.context';

import './logger.context';
import './cookie.context';

Vue.config.productionTip = false;

const initialise = (component, props) => {
    new Vue({
        i18n: i18nContext(),
        store: storeContext(),
        render: h => h(component, {
            props
        })
    }).$mount('#app');
};

export default initialise;
