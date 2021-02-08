<template>
    <form
        ref="form"
        :action="formUrl"
        :class="$style['c-search']"
        method="post"
        novalidate
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
                v-model="addressValue"
                :error-message="errorMessage"
                :custom-attribute-override="addressField"
                :service="service"
                :config="config"
                :copy="copy"
                :is-compressed="isCompressed"
                v-on="$listeners" />

            <component
                :is="setSuggestionType"
                v-if="shouldDisplaySuggestions"
                data-test-id="suggestions"
                aria-live="assertive"
                :copy="copy"
                :config="config"
                :suggestion-format="suggestionFormat"
                :suggestions="suggestions"
                :selected="keyboardSuggestionIndex"
                @selected-suggestion="onSelectedSuggestion" />

            <form-search-button
                :copy="copy"
                :is-compressed="isCompressed" />
        </div>

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
import FormFullAddressSearchSuggestions from './formElements/FormFullAddressSearchSuggestions.vue';
import searchboxModule from '../store/searchbox.module';
import { getLastLocation, normalisePostcode } from '../utils/helpers';
import { search, selectedSuggestion } from '../services/search.services';
import { JE_FULL_ADDRESS_DETAILS } from '../services/constants';
import {
    processLocationCookie,
    onCustomSubmit,
    generateFormQueryUrl,
    fullAddressLocalStorageService
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
        FormSearchSuggestions,
        FormFullAddressSearchSuggestions
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
            lastAddress: ''
        };
    },

    computed: {
        ...mapState('searchbox', [
            'address',
            'errors',
            'fullAddressDetails',
            'formattedFullAddress',
            'isBelowMid',
            'isValid',
            'isInputFocus',
            'isDirty',
            'isFullAddressSearchEnabled',
            'keyboardSuggestionIndex',
            'savedFullAddressDetails',
            'suggestions',
            'streetNumber',
            'selectedStreetLevelAddressId',
            'shouldDisplaySuggestionsDropdown'
        ]),

        addressValue: {
            get () {
                return this.address;
            },

            set (value) {
                this.setAddress(value);
            }
        },

        /**
         * Display API suggestions in component: `form-search-suggestions`:
         *
         * 1. Service layer should map to the option `autocomplete` or `isFullAddressSearchEnabled`.
         * 2. The form should have focus.
         * 3. There should be suggestions.
         *
         * */
        shouldDisplaySuggestions () {
            return (this.service.isAutocompleteEnabled || this.isFullAddressSearchEnabled)
                    && this.isInputFocus
                    && this.shouldDisplaySuggestionsDropdown
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
                    && this.addressValue === this.lastAddress
                    && this.isValid === true;
        },

        /**
         * Switch between two suggestion dropdown types:
         *
         * One for `Google Places: form-search-suggestions` & one for
         * `Loqate: form-full-address-search-suggestions` full address search.
         *
         * @returns {string}
         */
        setSuggestionType () {
            return this.isFullAddressSearchEnabled
                ? 'form-full-address-search-suggestions'
                : 'form-search-suggestions';
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
        addressValue: debounce(
            function invoker (value) {
                const { preSearchValidation } = this.service.options;
                const errors = !!preSearchValidation && this.service.isValid(value, preSearchValidation);

                if (Array.isArray(errors)) {
                    this.setIsDirty(true);
                    this.setSuggestions(Promise.reject(new Error(errors[0])));
                } else if (this.service.isAutocompleteEnabled) {
                    this.setSuggestions(this.service.search(value));
                }

                if (this.isFullAddressSearchEnabled && !this.isBelowMid) {
                    this.getMatchedAreaAddressResults({
                        address: this.addressValue
                    });
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
            const address = this.shouldAutoPopulateAddress ? this.lastAddress : '';
            this.setAddress(address);
        }

        this.formUrl = generateFormQueryUrl(this.queryString, this.formUrl);

        this.reinitialiseConfigSettings();
        this.initialiseFullAddressSearch(this.config);
        this.setIsBelowMid(document.body.clientWidth);
        window.addEventListener('resize', this.onResize);
    },

    destroyed () {
        window.removeEventListener('resize', this.onResize);
    },

    beforeCreate () {
        if (!this.$store.hasModule('searchbox')) {
            this.$store.registerModule('searchbox', searchboxModule);
        }
    },

    beforeDestroy () {
        this.$store.unregisterModule('searchbox');
    },

    methods: {
        ...mapActions('searchbox', [
            'setAddress',
            'setAutoNavigateToSerp',
            'setSuggestions',
            'setIsValid',
            'setErrors',
            'setIsDirty',
            'setIsBelowMid',
            'setStreetNumberRequired',
            'setGeoLocationAvailability',
            'setFullAddressSearchConfigs',
            'setAutoCompleteAvailability',
            'setSavedFullAddressDetails',
            'getMatchedAreaAddressResults'
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
            this.setIsValid(this.service.isValid(this.addressValue));

            if (this.hasLastSavedAddress) {
                e.preventDefault();
                this.$emit(SUBMIT_SAVED_ADDRESS);
                return this.searchPreviouslySavedAddress(e);
            }

            this.setIsDirty(true);

            if (this.isValid === true) {
                this.setErrors([]);
                this.clearAddressValue(this.shouldClearAddressOnValidSubmit);
                onCustomSubmit(this.onSubmit, this.addressValue, e);
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
                } else if (this.isFullAddressSearchEnabled) {
                    this.setSavedFullAddressDetails({
                        fullAddress: this.fullAddressDetails,
                        address: this.address
                    });
                    // Save selected Loqate address to localstorage on submit.
                    fullAddressLocalStorageService.setItem(JE_FULL_ADDRESS_DETAILS, ...this.savedFullAddressDetails);
                } else {
                    // Process standard address based location cookies `je-location`
                    processLocationCookie(this.shouldSetCookies, this.addressValue);
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
         * 1. `this.addressValue` is set either via the `index` (clicked on event) or
         * `keyboardSuggestionIndex` (enter key event) depending on which was used
         * the address is set accordingly.
         *
         * Returns a promise `locationInformation` so we can resolve/await the location information
         * within the `submit` handler, used for processing & setting cookies when the consuming app
         * needs to manually set them (e.g. menu).
         *
         * */
        onSelectedSuggestion (index) {
            this.setAddress(this.suggestionFormat(this.suggestions[index || this.keyboardSuggestionIndex]));

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
                event,
                query: this.query,
                cuisine: this.cuisine
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
                this.setAddress('');
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
                && normalisePostcode(this.lastAddress) !== normalisePostcode(this.addressValue)
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
         * @param config
         */
        initialiseFullAddressSearch (config) {
            if (config.isFullAddressSearchEnabled) {
                const isActive = config.isFullAddressSearchEnabled();
                const isFullAddressNavigateToSerpActive = config.isFullAddressNavigateToSerpEnabled
                        && config.isFullAddressNavigateToSerpEnabled();

                if (isActive) {
                    this.setFullAddressSearchConfigs({
                        isFullAddressSearchEnabled: isActive
                    });
                    this.setAutoNavigateToSerp(isFullAddressNavigateToSerpActive);
                    this.setAutoCompleteAvailability(true);
                    this.fetchLocalStorageAddress();
                } else {
                    // clear localStorage if feature is off.
                    fullAddressLocalStorageService.removeItem(JE_FULL_ADDRESS_DETAILS);
                }
            }
        },

        /**
         * Update state `isBelowMid` when the browser resizes, so
         * we can keep track of when we should trigger the
         * `FormFullAddressSearchModalOverlay.vue`.
         *
         */
        onResize: debounce(function resize () {
            this.setIsBelowMid(document.body.clientWidth);
        }, 100),

        /**
         * Fetch previous searched addresses from LocalStorage if it exists & then
         * pre-populate searchbox with this address.
         *
         */
        fetchLocalStorageAddress () {
            const addressFromLocalStorage = fullAddressLocalStorageService.getItem(JE_FULL_ADDRESS_DETAILS);

            if (addressFromLocalStorage && addressFromLocalStorage.searchBoxAddress) {
                this.setAddress(addressFromLocalStorage.searchBoxAddress);
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
