import Vue from 'vue';
import Vuex from 'vuex';

export default () => {
    Vue.use(Vuex);

    const newStore = new Vuex.Store({});

    return newStore;
};
