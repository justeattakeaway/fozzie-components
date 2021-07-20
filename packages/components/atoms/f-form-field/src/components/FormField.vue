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
                data-test-id="formfield-textarea"
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
                        [$style['c-formField-padding--iconLeft']]: hasLeftIcon,
                        [$style['c-formField-padding--iconRight']]: hasRightIcon
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
                v-if="hasLeftIcon"
                :class="[
                    $style['c-formField-icon'],
                    $style[`c-formField-icon--${fieldSize}`] ,
                    $style[`c-formField-icon--left`],
                    { [$style[`c-formField-icon--disabled`]]: isDisabled }
                ]">
                <slot
                    name="icon-left"
                />
            </span>

            <span
                v-if="hasRightIcon"
                :class="[
                    $style['c-formField-icon'],
                    $style[`c-formField-icon--${fieldSize}`] ,
                    $style[`c-formField-icon--right`],
                    { [$style[`c-formField-icon--disabled`]]: isDisabled }
                ]">
                <slot
                    name="icon-right"
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

        canDisplayIcon () {
            return VALID_ICON_INPUT_TYPES.includes(this.inputType);
        },

        hasLeftIcon () {
            return this.$slots['icon-left'] && this.canDisplayIcon;
        },

        hasRightIcon () {
            return this.$slots['icon-right'] && this.canDisplayIcon && !this.isDropdown;
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
        }
    }
};
</script>

<style lang="scss" module>
$small-icon-position            : 11px;
$medium-icon-position           : 15px;
$default-icon-position          : 19px;
$formField-icon-padding         : spacing(x7);

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
            display: block;
            height: 18px;
            width: 18px;
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
        @include icon-position($small-icon-position);
    }

    .c-formField-icon--medium {
        @include icon-position($medium-icon-position);
    }

    .c-formField-icon--large {
        @include icon-position($default-icon-position);
    }

    .c-formField-icon--left {
        @include icon-position($default-icon-position, 'left');
    }

    .c-formField-icon--right {
        @include icon-position($default-icon-position, 'right');
    }

    .c-formField-padding--iconRight {
        padding-right: $formField-icon-padding;
    }

    .c-formField-padding--iconLeft {
        padding-left: $formField-icon-padding;
    }
</style>
