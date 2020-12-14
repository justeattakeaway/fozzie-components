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
                :value="getAddressValue"
                name="postcode"
                type="search"
                data-test-id="address-box-input"
                :aria-label="copy.fieldLabel"
                :autocomplete="isAutocompleteEnabled ? 'off' : 'on'"
                :aria-describedby="errorMessage ? 'errorMessage' : false"
                :class="{
                    [$style['c-search-input']]: true,
                    [$style['is-notEmpty']]: address
                }"
                @input="$emit('input', $event.target.value)"
                @focus="toggleEnterLeaveInput(true)"
                @blur="toggleEnterLeaveInput(false)"
                @keydown.up="setKeyboardSuggestion(-1)"
                @keydown.down="setKeyboardSuggestion(1)">

            <span :class="$style['c-search-placeholder']">{{ copy.fieldPlaceholder }}</span>
        </label>

        <form-search-inner-field-wrapper
            :copy="copy"
            :service="service" />
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import FormSearchInnerFieldWrapper from './FormSearchInnerFieldWrapper.vue';
import { ADDRESS_SEARCH_FOCUS } from '../../event-types';

const ALLOWED_SELECTION_TIME = 500;

export default {
    components: {
        FormSearchInnerFieldWrapper
    },
    props: {
        errorMessage: {
            type: [Boolean, String],
            default: false
        },

        address: {
            type: String,
            default: ''
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
        }
    },

    computed: {
        ...mapState('searchbox', [
            'shouldInputFieldHaveFocus',
            'isStreetNumberRequired',
            'isGeoLocationAvailable',
            'isAutocompleteEnabled'
        ]),

        getAddressValue () {
            return this.address;
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
            'setInputFocus',
            'setKeyboardSuggestion'
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
            if (value) {
                this.setInputFocus(value);
                this.$emit(ADDRESS_SEARCH_FOCUS);
            } else {
                setTimeout(() => {
                    this.setInputFocus(value);
                }, ALLOWED_SELECTION_TIME);
            }
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

</style>
