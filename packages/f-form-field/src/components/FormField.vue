<template>
    <div
        :data-theme-formfield="theme"
        :class="[
            $style['c-formField'], {
                [$style['c-formField--invalid']]: hasError,
                [$style['c-formField--grouped']]: isFieldGrouped
            }
        ]"
        :data-test-id="testId.container">
        <div
            :class="$style['c-formField-inputWrapper']">
            <form-label
                v-if="!isInline"
                :label-style="normalisedLabelStyle"
                :for="uniqueId"
                :is-inline="isInline"
                :data-test-id="testId.label">
                {{ labelText }}
            </form-label>

            <form-dropdown
                v-if="isDropdown"
                :id="`${uniqueId}`"
                :attributes="$attrs"
                :type="normalisedInputType"
                :class="[
                    $style['c-formField-input'],
                    $style['c-formField-dropdownContainer'],
                    $style['c-formField-input--focus']
                ]"
                :dropdown-options="dropdownOptions"
                @update="updateOption"
                v-on="listeners" />

            <input
                v-else
                :id="`${uniqueId}`"
                :value="value"
                v-bind="$attrs"
                :type="normalisedInputType"
                placeholder=" "
                :data-test-id="testId.input"
                :class="[
                    $style['c-formField-input'],
                    (isSelectionControl ? $style['c-formField-input--focus'] : '')
                ]"
                @input="updateValue"
                v-on="listeners"
            >
            <form-label
                v-if="isInline"
                :label-style="normalisedLabelStyle"
                :for="uniqueId"
                :is-inline="isInline"
                :data-test-id="`${testId.label}--inline`">
                {{ labelText }}
            </form-label>
        </div>
        <slot name="error" />
    </div>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import FormDropdown from './FormDropdown.vue';
import FormLabel from './FormLabel.vue';
import Debounce from '../services/debounce';
import tenantConfigs from '../tenants';
import {
    CUSTOM_INPUT_TYPES,
    DEFAULT_INPUT_TYPE,
    VALID_INPUT_TYPES,
    VALID_LABEL_STYLES,
    MOBILE_WIDTH
} from '../constants';

export default {
    name: 'FormField',

    components: {
        FormDropdown,
        FormLabel
    },

    inheritAttrs: false,

    props: {
        locale: {
            type: String,
            default: ''
        },

        labelText: {
            type: String,
            default: ''
        },

        inputType: {
            type: String,
            default: DEFAULT_INPUT_TYPE,
            validator: value => ((VALID_INPUT_TYPES.indexOf(value) !== -1) || (CUSTOM_INPUT_TYPES.indexOf(value) !== -1))// The prop value must match one of the valid input types
        },

        labelStyle: {
            type: String,
            default: 'default',
            validator: value => (VALID_LABEL_STYLES.indexOf(value) !== -1) // The prop value must match one of the valid input types
        },

        value: {
            type: [String, Number],
            default: ''
        },

        hasError: {
            type: Boolean,
            default: false
        },

        dropdownOptions: {
            type: Array,
            default: () => null
        },

        isGrouped: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            windowWidth: null
        };
    },

    computed: {
        normalisedInputType () {
            if (VALID_INPUT_TYPES.includes(this.inputType)) {
                return this.inputType;
            }
            return DEFAULT_INPUT_TYPE;
        },

        normalisedLabelStyle () {
            if (VALID_LABEL_STYLES.includes(this.labelStyle)) {
                return this.labelStyle;
            }
            return '';
        },

        formFieldLocale () {
            return globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        },

        copy () {
            const localeConfig = tenantConfigs[this.formFieldLocale];
            return { ...localeConfig };
        },

        theme () {
            return globalisationServices.getTheme(this.formFieldLocale);
        },

        listeners () {
            return {
                ...this.$listeners,
                input: this.updateValue,
                update: this.updateOption
            };
        },

        uniqueId () {
            return `formField-${(this.$attrs.name ? this.$attrs.name : this._uid)}`;
        },

        testId () {
            const formFieldName = this.$attrs.name;

            return {
                container: formFieldName ? `formfield-${formFieldName}` : 'formfield-container',
                input: formFieldName ? `formfield-${formFieldName}-input` : 'formfield-input',
                label: formFieldName ? `formfield-${formFieldName}-label` : 'formfield-label'
            };
        },

        isInline () {
            return (this.windowWidth < MOBILE_WIDTH && this.labelStyle === 'inlineNarrow') ||
                this.labelStyle === 'inline';
        },

        isDropdown () {
            return this.inputType === 'dropdown';
        },

        isSelectionControl () {
            return !(this.inputType === 'radio' || this.inputType === 'checkbox');
        },

        isFieldGrouped () {
            return this.isGrouped && !this.hasError;
        }
    },

    mounted () {
        window.addEventListener('resize', Debounce(this.updateWidth, 100));
        this.updateWidth();
    },

    destroyed () {
        window.removeEventListener('resize', this.updateWidth);
    },

    methods: {
        updateValue (event) {
            this.$emit('input', event.target.value);
        },

        updateOption (option) {
            this.$emit('input', option);
        },

        updateWidth () {
            if (typeof (window) !== 'undefined') {
                this.windowWidth = window.innerWidth;
            }
        }
    }
};
</script>

<style lang="scss" module>
$form-input-textColour                    : $color-text;
$form-input-textColour--disabled          : $grey--midDark;
$form-input-bg                            : $white;
$form-input-bg--hover                     : rgba($black, 0.04);
$form-input-bg--disabled                  : $color-disabled;
$form-input-borderRadius                  : $border-radius;
$form-input-borderWidth                   : 1px;
$form-input-borderColour                  : $color-border;
$form-input-borderColour--focus           : $color-border--interactive;
$form-input-borderColour--invalid         : $red;
$form-input-borderColour--disabled        : $color-disabled;
$form-input-height                        : 46px; // height is 46px + 1px border = 48px
$form-input-padding                       : spacing(x1.5) spacing(x2);
$form-input-fontSize                      : 'body-l';
$form-input-focus                         : $blue--light;

.c-formField {
    & + & {
        margin-top: spacing(x2);
    }
}

    .c-formField-inputWrapper {
        position: relative;
    }

    .c-formField-input {
        width: 100%;
        font-family: $font-family-base;
        @include font-size($form-input-fontSize);
        font-weight: $font-weight-base;
        color: $form-input-textColour;
        @include rem(height, $form-input-height); //convert height to rem

        background-color: $form-input-bg;
        border: $form-input-borderWidth solid $form-input-borderColour;
        border-radius: $form-input-borderRadius;
        background-clip: padding-box;
        padding: $form-input-padding;

        &:hover {
            background-color: $form-input-bg--hover;
        }

        .c-formField--invalid & {
            border-color: $form-input-borderColour--invalid;
        }

        // Disabled state
        &[disabled] {
            cursor: not-allowed;

            &,
            &:hover {
                background-color: $form-input-bg--disabled;
                color: $form-input-textColour--disabled;
                border-color: $form-input-borderColour--disabled;
            }
        }
    }

    .c-formField-input--focus {
        &:focus,
        &:active,
        &:focus-within {
            box-shadow: 0 0 0 2pt $form-input-focus;
            outline: none;
        }
    }

    .c-formField-dropdownContainer {
        padding: 0;
    }

    .c-formField--grouped {
        & + & {
            margin-top: 0;

            .c-formField-input {
                border-radius: 0 0 $form-input-borderRadius $form-input-borderRadius;
                border-top: 0;
            }
        }
    }

    .c-formField--grouped:not(:last-child) {
        .c-formField-input {
            border-radius: 0;
        }
    }

    .c-formField--grouped:first-child {
        .c-formField-input {
            border-radius: $form-input-borderRadius $form-input-borderRadius 0 0;
        }
    }
</style>
