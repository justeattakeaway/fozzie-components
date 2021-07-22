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
            :class="$style['c-formField-fieldWrapper']">
            <form-label
                v-if="!isInline"
                :label-style="normalisedLabelStyle"
                :label-for="uniqueId"
                :is-inline="isInline"
                :is-disabled="isDisabled"
                :data-test-id="testId.label">
                {{ labelText }}
                <template #description>
                    <span
                        v-if="hasInputDescription"
                        :class="[
                            'u-spacingTop',
                            'u-spacingBottom--large',
                            $style['c-formField-label-description']
                        ]">
                        <slot />
                    </span>
                </template>
            </form-label>

            <form-dropdown
                v-if="isDropdown"
                :id="uniqueId"
                :attributes="$attrs"
                :type="normalisedInputType"
                :value="value"
                :field-size="fieldSize"
                :has-error="hasError"
                :has-icon="hasLeadingIcon"
                :dropdown-options="dropdownOptions"
                v-on="listeners" />

            <textarea
                v-else-if="isTextarea"
                :id="`${uniqueId}`"
                :aria-labelledby="`label-${uniqueId}`"
                :value="value"
                v-bind="$attrs"
                :class="[
                    $style['c-formField-field'],
                    $style['c-formField-field--textarea'],
                    { [$style['c-formField--invalid']]: hasError }
                ]"
                :data-test-id="testId.textarea"
                v-on="listeners" />

            <input
                v-else
                :id="`${uniqueId}`"
                :aria-labelledby="`label-${uniqueId}`"
                :value="value"
                v-bind="$attrs"
                :type="normalisedInputType"
                :min="normalisedInputType === 'number' ? minNumber : false"
                :max="normalisedInputType === 'number' ? maxNumber : false"
                placeholder=" "
                :data-test-id="testId.input"
                :class="[
                    $style['c-formField-field'],
                    $style[`c-formField-field--${fieldSize}`], {
                        [$style['c-formField-field--noFocus']]: isSelectionControl,
                        [$style['c-formField--invalid']]: hasError,
                        [$style['c-formField-padding--iconLeading']]: hasLeadingIcon,
                        [$style['c-formField-padding--iconTrailing']]: hasTrailingIcon
                    }]"
                v-on="listeners"
            >

            <form-label
                v-if="isInline"
                :id="`label-${uniqueId}`"
                :label-for="uniqueId"
                :label-style="normalisedLabelStyle"
                :is-inline="isInline"
                :data-test-id="`${testId.label}--inline`">
                {{ labelText }}
            </form-label>

            <span
                v-if="hasLeadingIcon"
                :class="[
                    $style['c-formField-icon'],
                    $style[`c-formField-icon--${fieldSize}`],
                    $style[`c-formField-icon--leading`],
                    { [$style[`c-formField-icon--disabled`]]: isDisabled }
                ]">
                <slot
                    name="icon-leading"
                />
            </span>

            <span
                v-if="hasTrailingIcon"
                :class="[
                    $style['c-formField-icon'],
                    $style[`c-formField-icon--${fieldSize}`],
                    $style[`c-formField-icon--trailing`],
                    { [$style[`c-formField-icon--disabled`]]: isDisabled }
                ]">
                <slot
                    name="icon-trailing"
                />
            </span>
        </div>
        <slot name="error" />
    </div>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import FormDropdown from './FormDropdown.vue';
import FormLabel from './FormLabel.vue';
import debounce from '../services/debounce';
import tenantConfigs from '../tenants';
import {
    CUSTOM_INPUT_TYPES,
    DEFAULT_INPUT_TYPE,
    VALID_INPUT_TYPES,
    VALID_ICON_INPUT_TYPES,
    VALID_TRAILING_ICON_INPUT_TYPES,
    DEFAULT_FIELD_SIZE,
    VALID_FIELD_SIZES,
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
            validator: value => (VALID_LABEL_STYLES.indexOf(value) !== -1) // The prop value must match one of the valid label types
        },

        fieldSize: {
            type: String,
            default: DEFAULT_FIELD_SIZE,
            validator: value => (VALID_FIELD_SIZES.indexOf(value) !== -1) // The prop value must match one of the valid field sizes
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
        },

        minNumber: {
            type: [Number, undefined],
            default: undefined
        },

        maxNumber: {
            type: [Number, undefined],
            default: undefined
        },

        hasInputDescription: {
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
                label: formFieldName ? `formfield-${formFieldName}-label` : 'formfield-label',
                textarea: formFieldName ? `formfield-${formFieldName}-textarea` : 'formfield-textarea'
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
            return this.inputType === 'radio' || this.inputType === 'checkbox';
        },

        isFieldGrouped () {
            return this.isGrouped && !this.hasError;
        },

        isTextarea () {
            return this.inputType === 'textarea';
        },

        isDisabled () {
            return this.$attrs.disabled === 'disabled';
        },

        isValidIconField () {
            return VALID_ICON_INPUT_TYPES.includes(this.inputType);
        },

        hasLeadingIcon () {
            return Boolean(this.$slots['icon-leading']);
        },

        hasTrailingIcon () {
            return Boolean(this.$slots['icon-trailing']);
        }
    },

    watch: {
        $props: {
            immediate: true,
            handler () {
                this.validateProps();
            }
        }
    },

    mounted () {
        window.addEventListener('resize', debounce(this.updateWidth, 100));
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
        },

        validateProps () {
            if (!this.isValidIconField && (this.hasLeadingIcon || this.hasTrailingIcon)) {
                throw new TypeError(`Form field is set to have inputType="${this.inputType}", but icons can only be displayed one of the following inputTypes: "${VALID_ICON_INPUT_TYPES.join('", "')}"`);
            }

            if (this.isDropdown && this.hasTrailingIcon) {
                throw new TypeError(`Form field is set to have inputType="dropdown", but trailing icons can only be displayed one of the following inputTypes: "${VALID_TRAILING_ICON_INPUT_TYPES.join('", "')}"`);
            }
        }
    }
};
</script>

<style lang="scss" module>
$form-input-icon-verticalIndent                : 15px;
$form-input-icon-verticalIndent--small         : 11px;
$form-input-icon-verticalIndent--large         : 19px;
$form-input-iconSize                           : 18px;

.c-formField {
    & + & {
        margin-top: spacing(x2);
    }
}

    .c-formField-fieldWrapper {
        position: relative;
    }

    .c-formField-field--textarea {
        background-clip: padding-box;
        padding: spacing(x2);
        resize: none;
    }

    .c-formField-field--noFocus {
        &:focus,
        &:active,
        &:focus-within {
            box-shadow: none;
        }
    }

    .c-formField--grouped {
        & + & {
            margin-top: 0;

            .c-formField-field {
                border-radius: 0 0 $form-input-borderRadius $form-input-borderRadius;
                border-top: 0;
            }
        }
    }

    .c-formField--grouped:not(:last-child) {
        .c-formField-field {
            border-radius: 0;
        }
    }

    .c-formField--grouped:nth-of-type(1) {
        .c-formField-field {
            border-radius: $form-input-borderRadius $form-input-borderRadius 0 0;
        }
    }

    .c-formField-label-description {
        display: block;
        font-weight: normal;
    }

    .c-formField-icon {
        svg {
            position: absolute;
            height: $form-input-iconSize;
            width: $form-input-iconSize;

            path {
                fill: $color-content-subdued;
            }
        }
    }

    .c-formField-icon--disabled {
        svg {
            path {
                fill: $color-content-disabled;
            }
        }
    }

    .c-formField-icon--small {
        @include indent-icon('bottom', $form-input-icon-verticalIndent--small);
    }

    .c-formField-icon--medium {
        @include indent-icon('bottom', $form-input-icon-verticalIndent);
    }

    .c-formField-icon--large {
        @include indent-icon('bottom', $form-input-icon-verticalIndent--large);
    }

    .c-formField-icon--leading {
        @include indent-icon('leading', $form-input-icon-verticalIndent);
    }

    .c-formField-icon--trailing {
        @include indent-icon('trailing', $form-input-icon-verticalIndent);
    }

    .c-formField-padding--iconTrailing {
        padding-right: $form-input-iconPadding;
    }
</style>
