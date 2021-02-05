<template>
    <div
        :class="{
            [$style['c-search-inputWrapper']]: true
        }">
        <label
            :class="{
                [$style['c-search-label']]: true,
                [$style['has-error']]: errorMessage,
                [$style['c-search-label--noBorder']]: isCompressed,
                [$style['has-geo']]: isGeoLocationAvailable,
                [$style['has-streetNumber']]: isStreetNumberRequired
            }">
            <input
                ref="addressInput"
                v-set-attributes="customAttributeOverride"
                :value="getAddressValue"
                :type="setInputType()"
                data-test-id="address-box-input"
                :aria-label="copy.fieldLabel"
                :autocomplete="isAutocompleteEnabled ? 'off' : 'on'"
                :aria-describedby="errorMessage ? 'errorMessage' : false"
                :class="{
                    [$style['c-search-input']]: true,
                    [$style['is-notEmpty']]: address
                }"
                @input="onUpdateAddress($event)"
                @focus="toggleEnterLeaveInput(true)"
                @blur="toggleEnterLeaveInput(false)"
                @keydown.up="setKeyboardSuggestion(-1)"
                @keydown.down="setKeyboardSuggestion(1)">

            <span :class="$style['c-search-placeholder']">{{ copy.fieldPlaceholder }}</span>

            <clear-button
                v-if="shouldDisplayClearButton"
                :class="$style['c-search-btn-clear']"
                data-test-id="search-btn-clear"
                @click="onClearAddress">
                <cross-icon />
                <span :class="$style['is-visuallyHidden']">
                    {{ copy.fullAddressSearchSuggestions.clearSearchBtn }}
                </span>
            </clear-button>

            <loading-indicator />
        </label>

        <form-search-inner-field-wrapper
            :copy="copy"
            :service="service" />

        <form-full-address-search-overlay
            v-if="isFullAddressSearchEnabled"
            :copy="copy"
            :config="config"
            :should-display-modal-overlay="shouldShowSuggestionsModal"
            @on-full-address-modal-closed="onCloseModal" />
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { CrossIcon } from '@justeat/f-vue-icons';
import ClearButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import FormSearchInnerFieldWrapper from './FormSearchInnerFieldWrapper.vue';
import FormFullAddressSearchOverlay from './FormFullAddressSearchModalOverlay.vue';
import LoadingIndicator from '../FormStates/FormLoadingIndicator.vue';
import { ADDRESS_SEARCH_FOCUS } from '../../event-types';

const ALLOWED_SELECTION_TIME = 500;

export default {
    components: {
        FormSearchInnerFieldWrapper,
        FormFullAddressSearchOverlay,
        CrossIcon,
        ClearButton,
        LoadingIndicator
    },

    directives: {
        /**
         * Extract object attributes and set them on the input component.
         *
         * */
        setAttributes (element, directive) {
            Object.entries(directive.value).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
        }
    },

    props: {
        errorMessage: {
            type: [Boolean, String],
            default: false
        },

        isCompressed: {
            type: Boolean,
            default: true
        },

        copy: {
            type: Object,
            default:  () => ({})
        },

        service: {
            type: Object,
            required: true
        },

        customAttributeOverride: {
            type: Object,
            default: () => ({})
        },

        config: {
            type: Object,
            default: () => ({})
        }
    },

    data () {
        return {
            isFullAddressModalClosed: false
        };
    },

    computed: {
        ...mapState('searchbox', [
            'address',
            'isBelowMid',
            'inputTimeoutValue',
            'isStreetNumberRequired',
            'isGeoLocationAvailable',
            'isAutocompleteEnabled',
            'isFullAddressSearchEnabled',
            'isLoadingResults',
            'shouldInputFieldHaveFocus',
            'shouldDisplaySuggestionsDropdown',
            'shouldShowSuggestionsModal'
        ]),

        getAddressValue () {
            return this.address;
        },

        /**
         * Only display loading spinner for Loqate feature for now.
         *
         * */
        shouldDisplayLoadingIndicator () {
            return this.isFullAddressSearchEnabled && this.isLoadingResults;
        },

        shouldDisplayClearButton () {
            return this.isFullAddressSearchEnabled
                    && !this.isLoadingResults
                    && !this.isBelowMid
                    && this.address.length;
        }
    },

    watch: {
        /**
         * We want to make sure that we focus the user on the input field when
         * results are returned. The `shouldInputFieldHaveFocus` is set via the
         * mutation in the store. We watch for a change after a successful response
         * and only then do we want to focus.
         *
         * */
        shouldInputFieldHaveFocus (value) {
            if (value) {
                this.$refs.addressInput.focus();
            }
        }
    },

    methods: {
        ...mapActions('searchbox', [
            'clearSuggestions',
            'setAddress',
            'setInputFocus',
            'setInputTimeoutValue',
            'setFocusOnInput',
            'setKeyboardSuggestion',
            'setShouldShowSuggestionModel'
        ]),

        /**
         * Set input focus value (boolean) when the user enters & leaves
         * the input field. We need to delay the blur event so users can make a selection,
         * if we don't delay it the suggestions disappear before they can click on their choice.
         *
         * DELAY: `ALLOWED_SELECTION_TIME: 500ms`
         *
         * @param {Boolean} value
         */
        toggleEnterLeaveInput (value) {
            if (this.isBelowMid) {
                this.handleFullAddressModal(value);
            }

            if (value) {
                this.setInputFocus(value);
                this.$emit(ADDRESS_SEARCH_FOCUS);
            } else {
                const inputTimeoutValue = setTimeout(() => {
                    this.setInputFocus(value);
                }, ALLOWED_SELECTION_TIME);

                this.setInputTimeoutValue(inputTimeoutValue);
            }
        },

        /**
         * Sets the input field type so we can switch between numeric (DK & NO) or non
         * numeric types (all the rest of the tenants).
         *
         * @returns {string}
         */
        setInputType () {
            return this.customAttributeOverride.isNumeric
                ? 'number'
                : 'search';
        },

        /**
         * Handles closing the `FormFullAddressSearchModalOverlay` modal.
         *
         * @param {Boolean}
         * */
        onCloseModal (value) {
            this.clearSuggestions([]);
            this.isFullAddressModalClosed = true;
            this.setShouldShowSuggestionModel(value);
        },

        /**
         * Handles opening the `FormFullAddressSearchModalOverlay` modal.
         *
         * @param {Boolean}
         * */
        onOpenModal (value) {
            this.isFullAddressModalClosed = false;
            this.setShouldShowSuggestionModel(value);
        },

        /**
         * 1. Emit the input value up to the parent component so v-model can use it.
         * 2. Open `FormFullAddressSearchModalOverlay` component on small screens & when
         * Loqate is turned on.
         *
         * @param {event}
         * */
        onUpdateAddress ($event) {
            this.$emit('input', $event.target.value);

            if (this.isBelowMid && this.isFullAddressSearchEnabled) {
                this.onOpenModal(true);
            }
        },

        /**
         * Toggles showing f-mega-modal on smaller screens. We use
         * this modal to display search results for smaller screens only.
         *
         * @param value
         */
        handleFullAddressModal (value) {
            if (value
                    && !this.isFullAddressModalClosed
                    && this.isFullAddressSearchEnabled) {
                this.setShouldShowSuggestionModel(true);
            } else {
                this.isFullAddressModalClosed = false;
            }
        },

        /**
         * Clear address field when the user clicks the clear button.
         * Reset suggestions & clear inputTimeoutValue so we can show results again
         * if the user searches.
         *
         */
        onClearAddress () {
            this.setAddress('');
            clearTimeout(this.inputTimeoutValue);
            this.clearSuggestions([]);
        }
    }
};
</script>

<style lang="scss" module>
@import '../../assets/scss/form';

.c-search-inputWrapper {
    position: relative;
    border: 0;
    margin: 0;
    padding: 0;
    flex: 1 1 auto;
}

.c-search-label--noBorder {
    border: none;
}

.c-search-inputWrapper--fullWidth {
    @include media('>=mid') {
        position: static;
    }
}

.c-search-btn-clear {
    $btn-size: 52px;
    $icon-size: 14px;

    background: $white;
    border: none;
    width: $btn-size;
    height: $btn-size;
    right: 5px;
    top: 5px;
    position: absolute;
    cursor: pointer;

    svg {
        width: $icon-size;
        height: $icon-size;
        top: 18px;
        left: 19px;
        position: absolute;

        g {
            fill: $grey--midDark;
        }
    }

    &:hover,
    &:focus {
        background-color: $grey--offWhite;
    }
}

// Hide only visually, but have it available for screenreaders: h5bp.com/v
.is-visuallyHidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;

    // Extends the .is-visuallyhidden class to allow the element to be focusable when navigated to via the keyboard: h5bp.com/p
    &.focusable:active,
    &.focusable:focus {
        clip: auto;
        height: auto;
        margin: 0;
        overflow: visible;
        position: static;
        width: auto;
    }
}

</style>
