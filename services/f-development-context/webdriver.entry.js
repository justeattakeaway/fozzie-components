import Vue from 'vue';

import i18n from './i18n.context';
import store from './vuex.context';
import './logger.context';
import './cookie.context';

Vue.config.productionTip = false;

const initialise = (component, props) => {
/* eslint-disable no-new */
    new Vue({
        i18n,
        store,
        render: h => h(component, {
            props
        })
    }).$mount('#app');
};

export default initialise;
