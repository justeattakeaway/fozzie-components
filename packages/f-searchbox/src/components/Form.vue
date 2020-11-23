<template>
    <form
        ref="form"
        :action="config.formUrl"
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
                :is-compressed="isCompressed" />

            <form-search-button
                :copy="copy"
                :is-compressed="isCompressed" />
        </div>

        <form-search-suggestions
            v-if="searchSuggestion"
            aria-live="assertive"
            :suggestion-format="suggestionFormat"
            :suggestions="searchSuggestion" />

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
import { search } from '../services/search.services';
import {
    processLocationCookie,
    onCustomSubmit
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
            suggestionFormat
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
        submit (e) {
            this.store.dispatch('setIsValid', this.service.isValid(this.address));

            if (this.hasLastSavedAddress) {
                return this.searchPreviouslySavedAddress(e);
            }

            if (this.store.state.isValid === true) {
                this.store.dispatch('setErrors', []);
                processLocationCookie(this.shouldSetCookies, this.address);
                this.clearAddressValue(this.shouldClearAddressOnValidSubmit);
                onCustomSubmit(this.onSubmit, this.address, e);
            } else {
                e.preventDefault();
                this.store.dispatch('setErrors', this.store.state.isValid);
            }

            return true;
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
}
</style>
