import Vue from 'vue';
import Vuex from 'vuex';

import {
    SET_SUGGESTIONS,
    SET_ERRORS,
    SET_IS_VALID,
    SET_IS_DIRTY
} from './mutation.types';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isValid: false,
        isDirty: false,
        errors: [],
        suggestions: null
    },

    actions: {
        setIsValid ({ commit }, payload) {
            commit(SET_IS_VALID, payload);
        },
        setIsDirty ({ commit }, payload) {
            commit(SET_IS_DIRTY, payload);
        },
        setErrors ({ commit }, payload) {
            commit(SET_ERRORS, payload);
        },
        setSuggestions ({ commit }, payload) {
            return payload.then(
                results => {
                    commit(SET_SUGGESTIONS, results);
                    commit(SET_ERRORS, []);
                    /**
                     * @Todo
                     * Handle street number behaviour here i.e when it's required as an input.
                     */
                },
                error => {
                    // no suggestions should exist if there's an error
                    commit(SET_SUGGESTIONS, []);
                    commit(SET_ERRORS, error.errors || [error.message]);
                }
            );
        }
    },

    mutations: {
        [SET_IS_VALID]: (state, isValid) => {
            state.isValid = isValid;
        },

        [SET_ERRORS]: (state, errors) => {
            state.errors = errors;
        },

        [SET_IS_DIRTY]: (state, isDirty) => {
            state.errors = isDirty;
        },

        [SET_SUGGESTIONS]: (state, suggestions) => {
            state.suggestions = suggestions;
        }
    }
});
