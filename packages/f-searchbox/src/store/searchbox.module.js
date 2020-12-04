import {
    SET_SUGGESTIONS,
    SET_ERRORS,
    SET_IS_VALID,
    SET_IS_DIRTY,
    SET_STREET_NUMBER_REQUIRED,
    SET_INPUT_FOCUS,
    SET_GEO_LOCATION_AVAILABILITY,
    SET_FOCUS_ON_INPUT,
    SET_STREET_NUMBER_VALUE,
    SET_KEYBOARD_SUGGESTION
} from './mutation.types';

export default {
    namespaced: true,
    state: {
        isValid: false,
        isDirty: false,
        errors: [],
        suggestions: [],
        streetNumberRequired: false,
        streetNumber: '',
        isInputFocus: false,
        isGeoLocationAvailable: false,
        shouldInputFieldHaveFocus: false,
        keyboardSuggestionIndex: 0
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
        /**
         * Takes the given payload (if successful a valid address search response or unsuccessful; a rejection) & commits the
         * relevant states.
         *
         * @param commit
         * @param payload
         * @returns {Promise.<TResult>}
         */
        setSuggestions ({ commit }, payload) {
            return payload.then(
                results => {
                    commit(SET_SUGGESTIONS, results);
                    commit(SET_ERRORS, []);
                    /**
                     * @Todo
                     * Handle street number behaviour here i.e when it's required as an input.
                     */

                    commit(SET_FOCUS_ON_INPUT, true);
                },
                error => {
                    /**
                     * If there's an error we need to clear the sugguestions & set the expected error.
                     */
                    commit(SET_IS_DIRTY, true);
                    commit(SET_SUGGESTIONS, []);
                    commit(SET_ERRORS, error.errors || [error.message]);
                }
            );
        },

        setStreetNumberRequired ({ commit }, payload) {
            commit(SET_STREET_NUMBER_REQUIRED, payload);
        },

        setInputFocus ({ commit }, payload) {
            commit(SET_INPUT_FOCUS, payload);
        },

        setGeoLocationAvailability ({ commit }, payload) {
            commit(SET_GEO_LOCATION_AVAILABILITY, payload);
        },

        setStreetNumber ({ commit }, payload) {
            commit(SET_STREET_NUMBER_VALUE, payload);
        },

        /**
         * Allows keyboard selections to be made via the up/down keys.
         *
         * 1. Sets the initial list index.
         * 2. Compare the set index to the suggestions available if we have a
         * larger index start from the first suggestion again.
         *
         * @param commit
         * @param state
         * @param payload
         */
        setKeyboardSuggestion ({ commit, state }, payload) {
            const setKeyBoardDirection = state.keyboardSuggestionIndex + payload;
            const suggestionsLength = state.suggestions.length - 1;

            commit(SET_KEYBOARD_SUGGESTION, setKeyBoardDirection);

            if (state.keyboardSuggestionIndex > suggestionsLength) {
                commit(SET_KEYBOARD_SUGGESTION, 0);
            } else if (state.keyboardSuggestionIndex < 0) {
                commit(SET_KEYBOARD_SUGGESTION, suggestionsLength);
            }
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
            state.isDirty = isDirty;
        },

        [SET_SUGGESTIONS]: (state, suggestions) => {
            state.suggestions = suggestions;
        },

        [SET_STREET_NUMBER_REQUIRED]: (state, streetNumberRequired) => {
            state.streetNumberRequired = streetNumberRequired;
        },

        [SET_STREET_NUMBER_VALUE]: (state, streetNumber) => {
            state.streetNumber = streetNumber;
        },

        [SET_INPUT_FOCUS]: (state, isInputFocus) => {
            state.isInputFocus = isInputFocus;
        },

        [SET_GEO_LOCATION_AVAILABILITY]: (state, isGeoLocationAvailable) => {
            state.isGeoLocationAvailable = isGeoLocationAvailable;
        },

        [SET_FOCUS_ON_INPUT]: (state, shouldInputFieldHaveFocus) => {
            state.shouldInputFieldHaveFocus = shouldInputFieldHaveFocus;
        },

        [SET_KEYBOARD_SUGGESTION]: (state, keyboardSuggestionIndex) => {
            state.keyboardSuggestionIndex = keyboardSuggestionIndex;
        }
    }
};
