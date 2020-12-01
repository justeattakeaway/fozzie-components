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
                :should-display-custom-autocomplete="service.isAutocompleteEnabled"
                :copy="copy"
                :is-compressed="isCompressed" />

            <form-search-button
                :copy="copy"
                :is-compressed="isCompressed" />
        </div>

        <form-search-suggestions
            v-if="shouldDisplaySuggestions"
            aria-live="assertive"
            :suggestion-format="suggestionFormat"
            :suggestions="suggestions"
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
            requiredFields
        };
    },

    computed: {
        ...mapState('searchbox', [
            'suggestions',
            'errors',
            'isValid',
            'streetNumberRequired',
            'isInputFocus',
            'streetNumber',
            'isDirty'
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

        // Set Geolocation state so we can display the geolocation icon button on small screens.
        this.setGeoLocationAvailability(this.service.isGeoAvailable);
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
            'setGeoLocationAvailability'
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
                return this.searchPreviouslySavedAddress(e);
            }

            this.setIsDirty(true);

            if (this.isValid === true) {
                this.setErrors([]);
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

                    // TODO process the je last location cookie for international markets...
                }
            } else {
                e.preventDefault();
                this.setErrors(this.isValid);
            }

            return true;
        },

        /**
         * Triggered from the child component `form-search-suggestions`.
         * Invokes `selectedSuggestion` from `search.service` which will
         * resolve / return specific cases. E.g. if we need more information
         * like the street number we flag this up to the component and display it.
         *
         * */
        onSelectedSuggestion (index) {
            selectedSuggestion(
                this.service,
                this.suggestions,
                this.requiredFields,
                this.streetNumber,
                index
            ).then(value => {
                if (value && value.errors) {
                    this.setErrors(value.errors);
                }

                if (value && value.requiresStreetNumber) {
                    this.setStreetNumberRequired(true);
                }
            });

            // TODO pass through suggestion index for keyboard behaviour...
            this.address = this.suggestionFormat(this.suggestions[index]);
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
                this.setIsDirty(false);
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
