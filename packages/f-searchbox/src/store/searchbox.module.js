import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    namespaced: true,
    state: {
        count: 0
    }
});
