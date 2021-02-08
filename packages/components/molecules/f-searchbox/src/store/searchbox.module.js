import fullAddressService from '../services/location/loqate';

import {
    CLEAR_FULL_ADDRESS_SUGGESTIONS,
    SET_SUGGESTIONS,
    SET_ERRORS,
    SET_IS_VALID,
    SET_IS_DIRTY,
    SET_STREET_NUMBER_REQUIRED,
    SET_INPUT_FOCUS,
    SET_GEO_LOCATION_AVAILABILITY,
    SET_FOCUS_ON_INPUT,
    SET_STREET_NUMBER_VALUE,
    SET_KEYBOARD_SUGGESTION,
    SET_FULL_ADDRESS_SEARCH_CONFIGS,
    SET_AUTO_COMPLETE_AVAILABILITY,
    SET_PARTIAL_ADDRESS_SUGGESTIONS,
    SET_CONTINUE_WITH_SUGGESTION,
    SET_SELECTED_STREET_LEVEL_ADDRESS_ID,
    SET_FULL_ADDRESS_DETAILS,
    SHOW_FULL_ADDRESS_DETAILS,
    SET_ADDRESS,
    SET_SHOULD_SHOW_SUGGESTIONS_DROPDOWN,
    SET_INPUT_TIMEOUT_VALUE,
    SET_IS_LOADING_RESULTS,
    SET_IS_BELOW_MID,
    SET_HAS_INPUT_ELEVATION,
    SET_SHOULD_SUGGESTIONS_MODEL,
    SET_SAVED_FULL_ADDRESS_DETAILS,
    SET_AUTO_NAVIGATE_TO_SERP
} from './mutation.types';

export default {
    namespaced: true,
    state: {
        address: '',
        continueWithSuggestionDetails: {},
        errors: [],
        fullAddressDetails: [],
        formattedFullAddress: '',
        keyboardSuggestionIndex: 0,
        savedFullAddressDetails: null,
        selectedStreetLevelAddressId: '',
        suggestions: [],
        streetNumber: '',
        streetLevelSelectionDetails: {},
        shouldInputFieldHaveFocus: false,
        shouldDisplaySuggestionsDropdown: true,
        shouldShowSuggestionsModal: false,
        shouldAutoNavigateToSerp: false,
        inputTimeoutValue: null,
        isLoadingResults: false,
        isValid: false,
        isDirty: false,
        isStreetNumberRequired: false,
        isInputFocus: false,
        isGeoLocationAvailable: false,
        isFullAddressSearchEnabled: false,
        isAutocompleteEnabled: false,
        isBelowMid: false,
        hasInputElevation: false
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

        setAddress ({ commit }, payload) {
            commit(SET_ADDRESS, payload);
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
                    commit(SET_FOCUS_ON_INPUT, true);
                },
                error => {
                    /**
                     * If there's an error we need to clear the suggestions & set the expected error.
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

        setFocusOnInput ({ commit }, payload) {
            commit(SET_FOCUS_ON_INPUT, payload);
        },

        setInputTimeoutValue ({ commit }, payload) {
            commit(SET_INPUT_TIMEOUT_VALUE, payload);
        },

        setGeoLocationAvailability ({ commit }, payload) {
            commit(SET_GEO_LOCATION_AVAILABILITY, payload);
        },

        setStreetNumber ({ commit }, payload) {
            commit(SET_STREET_NUMBER_VALUE, payload);
        },

        shouldShowSuggestionsDropdown ({ commit }, payload) {
            commit(SET_SHOULD_SHOW_SUGGESTIONS_DROPDOWN, payload);
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
        },

        setFullAddressSearchConfigs ({ commit }, payload) {
            const { isFullAddressSearchEnabled } = payload;

            commit(
                SET_FULL_ADDRESS_SEARCH_CONFIGS,
                {
                    isFullAddressSearchEnabled
                }
            );
        },

        setAutoCompleteAvailability ({ commit }, payload) {
            commit(SET_AUTO_COMPLETE_AVAILABILITY, payload);
        },

        /**
         * Attempt to make a call to Loqate's API once the min criteria has been reached.
         *
         * @param commit
         * @param payload
         * @returns {Promise.<void>}
         */
        async getMatchedAreaAddressResults ({ commit }, payload) {
            if (!fullAddressService.hasMinimumAddressCriteria(payload.address)) return;

            commit(SET_SHOULD_SHOW_SUGGESTIONS_DROPDOWN, true);
            commit(SET_IS_LOADING_RESULTS, true);

            const suggestions = await fullAddressService.getPartialAddressSearch(payload);

            if (suggestions) {
                commit(SET_SELECTED_STREET_LEVEL_ADDRESS_ID, payload);
                commit(SET_KEYBOARD_SUGGESTION, 0);
                commit(SET_PARTIAL_ADDRESS_SUGGESTIONS, { suggestions, payload });
            }

            commit(SET_IS_LOADING_RESULTS, false);
        },

        /**
         * Retrieves the final address selection made by the user. The Payload represents
         * the ID for the chosen address.
         *
         * @param commit
         * @param payload
         * @returns {Promise.<void>}
         */
        async getFinalAddressSelectionDetails ({ commit }, payload) {
            const retrievedAddress = await fullAddressService.getFullAddressDetails(payload);

            if (retrievedAddress) {
                commit(SET_FULL_ADDRESS_DETAILS, retrievedAddress);
            }
        },

        setSelectedFullAddressDetails ({ commit }, payload) {
            commit(SHOW_FULL_ADDRESS_DETAILS, payload);
        },

        setContinueWithDetails ({ commit }, payload) {
            commit(SET_CONTINUE_WITH_SUGGESTION, payload);
        },

        setIsBelowMid ({ commit }, payload) {
            const isBelowMid = payload < 768;

            commit(SET_IS_BELOW_MID, isBelowMid);
        },

        setShouldHaveInputElevation ({ commit }, payload) {
            commit(SET_HAS_INPUT_ELEVATION, payload);
        },

        setShouldShowSuggestionModel ({ commit }, payload) {
            commit(SET_SHOULD_SUGGESTIONS_MODEL, payload);
        },

        clearSuggestions ({ commit }, payload) {
            commit(CLEAR_FULL_ADDRESS_SUGGESTIONS, payload);
        },

        setSavedFullAddressDetails ({ commit }, payload) {
            commit(SET_SAVED_FULL_ADDRESS_DETAILS, payload);
        },

        setAutoNavigateToSerp ({ commit }, payload) {
            commit(SET_AUTO_NAVIGATE_TO_SERP, payload);
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

        [SET_STREET_NUMBER_REQUIRED]: (state, isStreetNumberRequired) => {
            state.isStreetNumberRequired = isStreetNumberRequired;
        },

        [SET_SHOULD_SHOW_SUGGESTIONS_DROPDOWN]: (state, shouldDisplaySuggestionsDropdown) => {
            state.shouldDisplaySuggestionsDropdown = shouldDisplaySuggestionsDropdown;
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

        [SET_INPUT_TIMEOUT_VALUE]: (state, inputTimeoutValue) => {
            state.inputTimeoutValue = inputTimeoutValue;
        },

        [SET_KEYBOARD_SUGGESTION]: (state, keyboardSuggestionIndex) => {
            state.keyboardSuggestionIndex = keyboardSuggestionIndex;
        },

        [SET_FULL_ADDRESS_SEARCH_CONFIGS]: (state, { isFullAddressSearchEnabled }) => {
            state.isFullAddressSearchEnabled = isFullAddressSearchEnabled;
        },

        [SET_AUTO_COMPLETE_AVAILABILITY]: (state, isAutocompleteEnabled) => {
            state.isAutocompleteEnabled = isAutocompleteEnabled;
        },

        /**
         * Map API response items and filter on `Postcode` value. We don't want to
         * return `Address` types here only postcode results for users.
         *
         * @param state
         * @param suggestions
         */
        [SET_PARTIAL_ADDRESS_SUGGESTIONS]: (state, { suggestions, payload }) => {
            const hasSelectedPartialAddress = payload && payload.streetLevelAddress;

            const results = suggestions.Items.map(({
                Description,
                Text,
                Id,
                Type
            }) => ({
                description: Description,
                text: Text,
                id: Id,
                type: Type
            }));

            state.suggestions = hasSelectedPartialAddress
                ? [...results, state.continueWithSuggestionDetails]
                : results.filter(addressDetails => addressDetails.type === 'Postcode');
        },

        /**
         *
         * Updates the payload based on previously selected `Item.id` (From the retrieve API call).
         *
         * We also manually need to remove duplicate IDs from Loqate's response.
         * (Bug in their response).
         *
         * @param state
         * @param fullAddressDetails
         */
        [SET_FULL_ADDRESS_DETAILS]: (state, fullAddressDetails) => {
            state.fullAddressDetails = fullAddressDetails.Items.reduce((seed, val) => {
                if (!seed.some(s => s.Id === val.Id)) {
                    seed.push(val);
                }
                return seed;
            }, []).map(({
                PostalCode,
                Line1,
                Line2,
                Line3,
                Line4,
                Line5,
                City,
                Company,
                Field1,
                Field2
            }) => ({
                postcode: PostalCode,
                line1: Company ? `${Company}, ${Line1}` : Line1,
                line2: Line2,
                line3: Line3,
                line4: Line4,
                line5: Line5,
                city: City,
                field1: Field1,
                field2: Field2
            }));
        },

        /**
         * Format the response from `SET_FULL_ADDRESS_DETAILS` & set a formatted address
         * string in state so we can display this to the user.
         *
         * @param state
         * @param address
         */
        [SHOW_FULL_ADDRESS_DETAILS]: (state, address) => {
            const addressValues = [];

            address.forEach(obj => {
                Object.keys(obj).forEach(key => {
                    if (!(key.indexOf('field1') !== -1) && !(key.indexOf('field2') !== -1)) {
                        addressValues.push(obj[key]);
                    }
                });
            });

            state.address = addressValues.filter(Boolean).join(', ');
        },

        [SET_CONTINUE_WITH_SUGGESTION]: (state, continueWithSuggestionDetails) => {
            state.continueWithSuggestionDetails = continueWithSuggestionDetails;
        },

        [SET_SELECTED_STREET_LEVEL_ADDRESS_ID]: (state, selectedStreetLevelAddressId) => {
            state.selectedStreetLevelAddressId =
                (selectedStreetLevelAddressId && selectedStreetLevelAddressId.streetLevelAddress);
        },

        [SET_ADDRESS]: (state, address) => {
            state.address = address;
        },

        [SET_IS_LOADING_RESULTS]: (state, isLoadingResults) => {
            state.isLoadingResults = isLoadingResults;
        },

        [SET_IS_BELOW_MID]: (state, isBelowMid) => {
            state.isBelowMid = isBelowMid;
        },

        [SET_HAS_INPUT_ELEVATION]: (state, hasInputElevation) => {
            state.hasInputElevation = hasInputElevation;
        },

        [SET_SHOULD_SUGGESTIONS_MODEL]: (state, shouldShowSuggestionsModal) => {
            state.shouldShowSuggestionsModal = shouldShowSuggestionsModal;
        },

        [CLEAR_FULL_ADDRESS_SUGGESTIONS]: (state, suggestions) => {
            state.suggestions = suggestions;
        },

        [SET_SAVED_FULL_ADDRESS_DETAILS]: (state, savedFullAddressDetails) => {
            const { address, fullAddress } = savedFullAddressDetails;
            let savedAddressResult;

            if (!address) return;

            savedAddressResult = [{
                Line1: null,
                Line2: null,
                Line3: null,
                Line4: null,
                Line5: null,
                City: null,
                Field1: null,
                Field2: null,
                PostalCode: null,
                searchBoxAddress: address
            }];

            if (fullAddress && fullAddress.length) {
                savedAddressResult = fullAddress.map(({
                    city,
                    field1,
                    field2,
                    line1,
                    line2,
                    line3,
                    line4,
                    line5,
                    postcode
                }) => ({
                    City: city,
                    Field1: field1,
                    Field2: field2,
                    Line1: line1,
                    Line2: line2,
                    Line3: line3,
                    Line4: line4,
                    Line5: line5,
                    PostalCode: postcode,
                    searchBoxAddress: address
                }));
            }

            state.savedFullAddressDetails = savedAddressResult;
        },

        [SET_AUTO_NAVIGATE_TO_SERP]: (state, shouldAutoNavigateToSerp) => {
            state.shouldAutoNavigateToSerp = shouldAutoNavigateToSerp;
        }
    }
};
