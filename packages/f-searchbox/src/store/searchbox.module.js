import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isValid: false,
        isDirty: false,
        errors: []
    },

    mutations: {
        SET_IS_VALID: (state, isValid) => {
            state.isValid = isValid;
        },

        SET_ERRORS: (state, errors) => {
            state.errors = errors;
        },

        SET_IS_DIRTY: (state, isDirty) => {
            state.errors = isDirty;
        }
    }
});
