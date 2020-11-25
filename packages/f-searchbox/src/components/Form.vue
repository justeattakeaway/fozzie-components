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
                :should-display-custom-autocomplete="service.isAutocompleteEnabled"
                :copy="copy"
                :street-number="streetNumber"
                :should-display-street-number-field="shouldDisplayStreetNumberField"
                :is-compressed="isCompressed"
                @focus="onFormFocusBlurEvent"
                @blur="onFormFocusBlurEvent"/>

            <form-search-button
                :copy="copy"
                :is-compressed="isCompressed" />
        </div>

        <form-search-suggestions
            v-if="shouldDisplaySuggestions"
            aria-live="assertive"
            :suggestion-format="suggestionFormat"
            :suggestions="searchSuggestion"
            @selected-suggestion="onSelectedSuggestion"/>

        <error-message
            v-if="errorMessage"
            :class="$style['c-search-error']"
            aria-live="assertive">
            {{ errorMessage }}
        </error-message>
    </form>
</template>

<script>
import debounce from 'lodash.debounce';
import ErrorMessage from '@justeat/f-error-message';
import '@justeat/f-error-message/dist/f-error-message.css';
import FormSearchField from './formElements/FormSearchField.vue';
import FormSearchButton from './formElements/FormSearchButton.vue';
import FormSearchSuggestions from './formElements/FormSearchSuggestions.vue';
import store from '../store/searchbox.module';
import { getLastLocation } from '../utils/helpers';
import { search, selectedSuggestion } from '../services/search.services';
import {
    processLocationCookie,
    onCustomSubmit,
    generateFormQueryUrl
} from '../services/general.services';

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
            requiredFields,
            streetNumber: '',
            isInputFocus: false,
            store
        };
    },

    computed: {
        /**
         * Get stored `suggestions` from state if they exist. To minimize multiple types of
         * suggestion types i.e at an API level; we should try and stick to this single suggestion value
         * for all consuming APIs rather than creating new ones based on the APIs we're consuming.
         *
         * */
        searchSuggestion () {
            return this.store.state.suggestions;
        },

        /**
         * Display API suggestions in component: `form-search-suggestions`:
         *
         * 1. Service layer should contain `autocomplete`.
         * 2. The form should have focus.
         * 3. There should be suggestions.
         * 4. There's no errors (otherwise the suggestions cover the errors) OR the input has been touched.
         *
         * */
        shouldDisplaySuggestions () {
            return this.service.isAutocompleteEnabled
                    && this.isInputFocus
                    && !!this.store.state.suggestions.length
                    && !this.store.state.errors.length;
        },

        /**
         * Return a tenant specific error message from the config.
         *
         * @returns {*}
         */
        errorMessage () {
            const messageKey = this.store.state.errors.length && this.store.state.errors[0];

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
                    && this.store.state.isValid === true;
        },

        /**
         * In some instances (ES & IT tenants) we require a street number to be provided if there's
         * not enough of the address information supplied by the user, in which case we display another input field
         * for street numbers to be entered in. Component: `FormSearchStreetNumber`.
         *
         * */
        shouldDisplayStreetNumberField () {
            return this.store.state.streetNumberRequired;
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

                debugger;
                if (Array.isArray(errors)) {
                    this.store.dispatch('setIsDirty', true);
                    this.store.dispatch('setSuggestions', Promise.reject(new Error(errors[0])));
                } else {
                    this.store.dispatch('setSuggestions', this.service.search(value));
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
    },

    methods: {
        /**
         * Main submit handler that's responsible for submitting searches: for example to SERP.
         *
         * 1. Checks address validation.
         * 2. If the address is valid we submit the address.
         * 3. Note: `configs` determine custom behaviour, e.g shouldSetCookies & shouldClearAddressOnValidSubmit etc see readme.
         *
         * @param e
         */
        async submit (e) {
            this.store.dispatch('setIsValid', this.service.isValid(this.address));

            if (this.hasLastSavedAddress) {
                return this.searchPreviouslySavedAddress(e);
            }

            this.store.dispatch('setIsDirty', true);

            if (this.store.state.isValid === true) {
                this.store.dispatch('setErrors', []);
                processLocationCookie(this.shouldSetCookies, this.address);
                this.clearAddressValue(this.shouldClearAddressOnValidSubmit);
                onCustomSubmit(this.onSubmit, this.address, e);

                if (this.service.isAutocompleteEnabled) {
                    e.preventDefault();

                    const info = await this.onSelectedSuggestion(0);

                    // if the address is still missing fields, return here
                    if (!info) {
                        return false;
                    }

                    // TODO process the je last location cookie...
                }
            } else {
                e.preventDefault();
                this.store.dispatch('setErrors', this.store.state.isValid);
            }

            return true;
        },

        onSelectedSuggestion (index) {
            selectedSuggestion(
                this.service,
                this.store.state.suggestions,
                this.requiredFields,
                this.streetNumber,
                index
            ).then((value) => {
                debugger;

                if (value && value.errors) {
                    this.store.dispatch('setErrors', value.errors);
                }

                if (value && value.requiresStreetNumber) {
                    this.store.dispatch('setStreetNumberRequired', value.requiresStreetNumber);
                }
            });

            // TODO pass through suggestion index for keyboard behaviour...
            this.address = this.suggestionFormat(this.store.state.suggestions[index]);

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
                callback: getLastLocation,
                event
            };

            search(searchPayload);
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
                this.store.dispatch('setIsDirty', false);
            }
        },

        onFormFocusBlurEvent (value) {
            if (value) {
                this.isInputFocus = value;
            } else {
                setTimeout(() => {
                    this.isInputFocus = value;
                }, 500);
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
