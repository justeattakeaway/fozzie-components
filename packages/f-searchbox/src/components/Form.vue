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
            <form-label-wrapper
                v-model="address"
                :error-message="errorMessage"
                :address="address"
                :copy="copy"
                :is-compressed="isCompressed" />

            <form-search-button
                :copy="copy"
                :is-compressed="isCompressed" />
        </div>

        <error-message
            v-if="errorMessage"
            :class="$style['c-search-error']"
            aria-live="assertive">
            {{ errorMessage }}
        </error-message>
    </form>
</template>

<script>
import ErrorMessage from '@justeat/f-error-message';
import FormLabelWrapper from './formElements/FormLabelWrapper.vue';
import FormSearchButton from './formElements/FormSearchButton.vue';
import '@justeat/f-error-message/dist/f-error-message.css';
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
        FormLabelWrapper,
        FormSearchButton
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
            clearAddressOnValidSubmit,
            addressField,
            setCookies,
            onSubmit,
            autoPopulateAddress
        } = this.config;

        return {
            address: this.lastAddress || address,
            cuisine,
            query,
            formUrl,
            queryString,
            isCompressed,
            clearAddressOnValidSubmit,
            addressField,
            setCookies,
            onSubmit,
            autoPopulateAddress,
            store
        };
    },

    computed: {
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

    mounted () {
        this.lastAddress = this.config.locationFormat(getLastLocation());

        if (this.lastAddress) {
            this.address = this.autoPopulateAddress ? this.lastAddress : '';
        }
    },

    methods: {
        /**
         * Main submit handler that's responsible for submitting searches to SERP:
         *
         * 1. Checks address validation.
         * 2. If the address is valid we submit the address.
         * 3. Note: `configs` determine custom behaviour, e.g setCookies & clearAddressOnValidSubmit etc see readme.
         *
         * @param e
         */
        async submit (e) {
            this.store.commit('SET_IS_VALID', this.service.isValid(this.address));

            if (this.hasLastSavedAddress) {
                return this.searchPreviouslySavedAddress(e);
            }

            if (this.store.state.isValid === true) {
                this.store.commit('SET_ERRORS', []);
                processLocationCookie(this.setCookies, this.address);
                this.clearAddressValue(this.clearAddressOnValidSubmit);
                onCustomSubmit(this.onSubmit, this.address, e);
            } else {
                e.preventDefault();
                this.store.commit('SET_ERRORS', this.store.state.isValid);
            }

            return true;
        },

        /**
         * Responsible for submitting a manual `form.submit` If a custom `onSubmit` method is passed through
         * from the consuming application we want to ignore the submit as the `onSubmit` in some cases (Menu) will not require
         * navigation to SERP.
         *
         * 1. Checks address validation.
         * 2. If the address is valid we submit the address to SERP.
         * 3. Note: `configs` determine custom behaviour, e.g setCookies & clearAddressOnValidSubmit etc see readme.
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
         * Determined by the config `clearAddressOnValidSubmit`.
         *
         * @param shouldClear
         */
        clearAddressValue (shouldClear) {
            if (shouldClear) {
                this.address = '';
                this.store.commit('SET_IS_DIRTY', false);
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
