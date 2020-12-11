<template>
    <form
        ref="form"
        :action="formUrl"
        :class="$style['c-search']"
        method="post"
        @submit.stop="submit">
        <input
            v-model="cuisine"
            type="hidden"
            name="cuisine">
        <input
            v-model="query"
            type="hidden"
            name="query">

        <div :class="$style['c-search-fieldWrapper']">
            <form-search-field
                v-model="address"
                :error-message="errorMessage"
                :address="address"
                :service="service"
                :copy="copy"
                :is-compressed="isCompressed"
                v-on="$listeners" />

            <form-search-button
                :copy="copy"
                :is-compressed="isCompressed" />
        </div>

        <form-search-suggestions
            v-if="shouldDisplaySuggestions"
            aria-live="assertive"
            :suggestion-format="suggestionFormat"
            :suggestions="suggestions"
            :keyboard-suggestion-selection="keyboardSuggestionIndex"
            @selected-suggestion="onSelectedSuggestion" />

        <error-message
            v-if="errorMessage"
            ref="errorMessage"
            :class="$style['c-search-error']"
            aria-live="assertive">
            {{ errorMessage }}
        </error-message>
    </form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import debounce from 'lodash.debounce';
import ErrorMessage from '@justeat/f-error-message';
import '@justeat/f-error-message/dist/f-error-message.css';
import FormSearchField from './formElements/FormSearchField.vue';
import FormSearchButton from './formElements/FormSearchButton.vue';
import FormSearchSuggestions from './formElements/FormSearchSuggestions.vue';
import searchboxModule from '../store/searchbox.module';
import { getLastLocation, normalisePostcode } from '../utils/helpers';
import { search, selectedSuggestion } from '../services/search.services';
import {
    processLocationCookie,
    onCustomSubmit,
    generateFormQueryUrl
} from '../services/general.services';
import {
    SUBMIT_SAVED_ADDRESS,
    SUBMIT_VALID_ADDRESS,
    SEARCHBOX_ERROR,
    TRACK_POSTCODE_CHANGED
} from '../event-types';

export default {
    components: {
        ErrorMessage,
        FormSearchField,
        FormSearchButton,
        FormSearchSuggestions
    },

    props: {
        copy: {
            type: Object,
            default: () => {}
        },
        config: {
            type: Object,
            default: () => {}
        },
        service: {
            type: Object,
            default: () => {}
        }
    },

    data () {
        const {
            address,
            cuisine,
            query,
            formUrl,
            queryString,
            isCompressed,
            shouldClearAddressOnValidSubmit,
            addressField,
            shouldSetCookies,
            onSubmit,
            shouldAutoPopulateAddress,
            suggestionFormat,
            requiredFields
        } = this.config;

        return {
            address: this.lastAddress || address,
            cuisine,
            query,
            formUrl,
            queryString,
            isCompressed,
            shouldClearAddressOnValidSubmit,
            addressField,
            shouldSetCookies,
            onSubmit,
            shouldAutoPopulateAddress,
            suggestionFormat,
            requiredFields
        };
    },

    computed: {
        ...mapState('searchbox', [
            'suggestions',
            'errors',
            'isValid',
            'isInputFocus',
            'streetNumber',
            'isDirty',
            'keyboardSuggestionIndex',
            'isFullAddressSearchEnabled'
        ]),

        /**
         * Display API suggestions in component: `form-search-suggestions`:
         *
         * 1. Service layer should contain `autocomplete`.
         * 2. The form should have focus.
         * 3. There should be suggestions.
         *
         * */
        shouldDisplaySuggestions () {
            return this.service.isAutocompleteEnabled
                    && this.isInputFocus
                    && !!this.suggestions.length
                    && (!this.errors.length || this.isDirty);
        },

        /**
         * Return a tenant specific error message from the config.
         *
         * @returns {*}
         */
        errorMessage () {
            const messageKey =
                    this.isDirty
                    && this.errors
                    && this.errors.length
                    && this.errors[0];

            if (!messageKey) return false;

            return this.copy.errors[messageKey] || this.copy.errors.UNKNOWN_ERROR;
        },

        /**
         * Checks to see if the lastAddress (set via `je-location` cookie) matches the `address` value. Will also
         * verify that the address is valid.
         *
         * @returns {Boolean}
         */
        hasLastSavedAddress () {
            return this.lastAddress
                    && this.address === this.lastAddress
                    && this.isValid === true;
        }
    },

    watch: {
        /**
         * Watches address value, based on the input value we perform any `preSearchValidation` validation; if supplied
         * via the service options. We then dispatch / set the suggestions by either resolving the promise or rejecting it.
         * The end results means `suggestions: []` gets populated if results are returned, this is passed to the
         * search suggestions component dropdown.
         *
         * */
        address: debounce(
            function invoker (value) {
                const { preSearchValidation } = this.service.options;
                const errors = !!preSearchValidation && this.service.isValid(value, preSearchValidation);

                if (Array.isArray(errors)) {
                    this.setIsDirty(true);
                    this.setSuggestions(Promise.reject(new Error(errors[0])));
                } else {
                    this.setSuggestions(this.service.search(value));
                }
            },
            500,
            { maxWait: 1500 }
        )
    },

    mounted () {
        // `lastAddress` is set by returning the location cookie stored on the users machine.
        this.lastAddress = this.config.locationFormat(getLastLocation());

        if (this.lastAddress) {
            this.address = this.shouldAutoPopulateAddress ? this.lastAddress : '';
        }

        this.formUrl = generateFormQueryUrl(this.queryString, this.formUrl);

        this.reinitialiseConfigSettings();
        this.initialiseFullAddressSearch(this.config.isFullAddressSearchEnabled);
    },

    created () {
        if (!this.$store.hasModule('searchbox')) {
            this.$store.registerModule('searchbox', searchboxModule);
        }
    },

    beforeDestroy () {
        this.$store.unregisterModule('searchbox');
    },

    methods: {
        ...mapActions('searchbox', [
            'setSuggestions',
            'setIsValid',
            'setErrors',
            'setIsDirty',
            'setStreetNumberRequired',
            'setGeoLocationAvailability',
            'setFullAddressSearchConfigs',
            'setAutoCompleteAvailability'
        ]),

        /**
         * Main submit handler that's responsible for submitting searches: for example to SERP.
         *
         * 1. Checks address validation.
         * 2. If the address is valid we submit the address.
         * 3. Note: `configs` determine custom behaviour, e.g shouldSetCookies & shouldClearAddressOnValidSubmit etc see readme.
         * 4. If address is `isValid` & `isAutocompleteEnabled` is `true` we need to await `onSelectedSuggestion` before we proceed to make
         * a search.
         *
         * @param e
         */
        async submit (e) {
            this.setIsValid(this.service.isValid(this.address));

            if (this.hasLastSavedAddress) {
                e.preventDefault();
                this.$emit(SUBMIT_SAVED_ADDRESS);
                return this.searchPreviouslySavedAddress(e);
            }

            this.setIsDirty(true);

            if (this.isValid === true) {
                this.setErrors([]);
                this.clearAddressValue(this.shouldClearAddressOnValidSubmit);
                onCustomSubmit(this.onSubmit, this.address, e);
                this.verifyHasPostcodeChanged();

                if (this.service.isAutocompleteEnabled) {
                    e.preventDefault();

                    const info = await this.onSelectedSuggestion();

                    // if the address is still missing fields, return here
                    if (!info) {
                        return false;
                    }

                    // Process international based location cookies `je-last-*`
                    processLocationCookie(this.shouldSetCookies, info);
                } else {
                    // Process standard address based location cookies `je-location`
                    processLocationCookie(this.shouldSetCookies, this.address);
                }

                this.$emit(SUBMIT_VALID_ADDRESS);
            } else {
                e.preventDefault();
                this.setErrors(this.isValid);
                this.$emit(SEARCHBOX_ERROR, this.errors);
            }

            return true;
        },

        /**
         * Triggered from the child component `form-search-suggestions`.
         * Invokes `selectedSuggestion` from `search.service` which will
         * resolve / return specific cases. E.g. if we need more information
         * like the street number we flag this up to the component and display it.
         *
         * 1. `this.address` is set either via the `index` (clicked on event) or
         * `keyboardSuggestionIndex` (enter key event) depending on which was used
         * the address is set accordingly.
         *
         * Returns a promise `locationInformation` so we can resolve/await the location information
         * within the `submit` handler, used for processing & setting cookies when the consuming app
         * needs to manually set them (e.g. menu).
         *
         * */
        onSelectedSuggestion (index) {
            this.address = this.suggestionFormat(this.suggestions[index || this.keyboardSuggestionIndex]);

            const locationInformation = selectedSuggestion(
                this.service,
                this.suggestions,
                this.requiredFields,
                this.streetNumber,
                index,
                this.keyboardSuggestionIndex,
                this.onSubmit
            );

            locationInformation.then(value => {
                if (value && value.errors) {
                    this.setErrors(value.errors);
                }

                if (value && value.requiresStreetNumber) {
                    this.setStreetNumberRequired(true);
                }
            });

            return locationInformation;
        },

        /**
         * Responsible for submitting a manual `form.submit` If a custom `onSubmit` method is passed through
         * from the consuming application we want to ignore the submit as the `onSubmit` in some cases (Menu) will not require
         * navigation to SERP.
         *
         * @param event
         */
        searchPreviouslySavedAddress (event) {
            const searchPayload = {
                onSubmit: this.onSubmit,
                formUrl: this.formUrl,
                form: this.$refs.form,
                event
            };

            search(searchPayload, getLastLocation());
        },

        /**
         * Clears the address value when the address is valid.
         * Determined by the config `shouldClearAddressOnValidSubmit`.
         *
         * @param shouldClearAddressOnValidSubmit
         */
        clearAddressValue (shouldClearAddressOnValidSubmit) {
            if (shouldClearAddressOnValidSubmit) {
                this.address = '';
                this.setIsDirty(false);
            }
        },

        /**
         * Emits a track postcode change event if the users last address (i.e je-location)
         * has changed. For example, if they were to change & submit a new valid address in
         * searchbox.
         *
         */
        verifyHasPostcodeChanged () {
            if (
                this.lastAddress
                && normalisePostcode(this.lastAddress) !== normalisePostcode(this.address)
            ) {
                this.$emit(TRACK_POSTCODE_CHANGED);
            }
        },

        /**
         * Initialise geo location & autocomplete features based on the clientInit.
         */
        reinitialiseConfigSettings () {
            this.setGeoLocationAvailability(this.service.isGeoAvailable);
            this.setAutoCompleteAvailability(this.service.isAutocompleteEnabled);
        },

        /**
         * Initialise tenant specific full address feature if available. See en-gb as an
         * example.
         *
         * @param isFullAddressSearchEnabled
         */
        initialiseFullAddressSearch (isFullAddressSearchEnabled) {
            if (isFullAddressSearchEnabled) {
                this.setFullAddressSearchConfigs({
                    isFullAddressSearchEnabled: isFullAddressSearchEnabled()
                });

                if (this.isFullAddressSearchEnabled) {
                    this.setAutoCompleteAvailability(true);
                }
            }
        }
    }
};
</script>

<style lang="scss" module>
.c-search {
    background-color: transparent;
    display: inline-block;
    position: relative;
    width: 100%;
    max-width: 610px;

    @include media('>=narrow') {
        min-height: 90px;
    }
}

.c-search-fieldWrapper {
    display: flex;
}

.c-search-error {
    @include font-size(body-s, false);
    position: static;
    text-align: left;
}
</style>
