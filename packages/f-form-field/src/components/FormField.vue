<template>
    <div
        :data-theme-formfield="theme"
        :class="[
            $style['c-formField'], {
                [$style['c-formField--invalid']]: hasError
            }
        ]"
        data-test-id="form-field-component">
        <div
            :class="$style['c-formField-inputWrapper']">
            <form-label
                v-if="!isInline"
                :label-style="normalisedLabelStyle"
                :for="uniqueId"
                :is-inline="isInline"
                data-test-id="form-field-label">
                {{ labelText }}
            </form-label>
            <input
                :id="`${uniqueId}`"
                :value="value"
                v-bind="$attrs"
                :type="normalisedInputType"
                placeholder=" "
                :data-test-id="testId"
                :class="[
                    $style['o-form-field'],
                    $style['c-formField-input']
                ]"
                @input="updateValue"
                v-on="listeners"
            >
            <form-label
                v-if="isInline"
                :label-style="normalisedLabelStyle"
                :for="uniqueId"
                :is-inline="isInline"
                data-test-id="form-field-label--inline">
                {{ labelText }}
            </form-label>
        </div>
        <slot name="error" />
    </div>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import FormLabel from './FormLabel.vue';
import Debounce from '../services/debounce';
import tenantConfigs from '../tenants';
import {
    VALID_INPUT_TYPES,
    DEFAULT_INPUT_TYPE,
    VALID_LABEL_STYLES,
    MOBILE_WIDTH
} from '../constants';

export default {
    name: 'FormField',

    components: {
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
            validator: value => (VALID_INPUT_TYPES.indexOf(value) !== -1) // The prop value must match one of the valid input types
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

        dataTestId: {
            type: String,
            default: ''
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
                input: this.updateValue
            };
        },

        uniqueId () {
            return `formField-${(this.$attrs.name ? this.$attrs.name : this._uid)}`;
        },

        testId () {
            return this.dataTestId || this.$attrs.name || false;
        },

        isInline () {
            return (this.windowWidth < MOBILE_WIDTH && this.labelStyle === 'inlineNarrow') ||
                this.labelStyle === 'inline';
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
        @include rem(height, $form-input-height); //convert height to rem
        padding: $form-input-padding; //convert padding to rem
        @include font-size($form-input-fontSize);
        font-family: $font-family-base;
        color: $form-input-textColour;
        font-weight: $font-weight-base;
        background-color: $form-input-bg;
        border: $form-input-borderWidth solid $form-input-borderColour;
        border-radius: $form-input-borderRadius;
        background-clip: padding-box;

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


</style>
