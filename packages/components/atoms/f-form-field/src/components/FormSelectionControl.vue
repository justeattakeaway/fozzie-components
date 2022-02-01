<template>
    <div
        :data-test-id="testId.container">
        <input
            :id="$attrs.id"
            :aria-labelledby="`label-${$attrs.id}`"
            v-bind="attributes"
            :type="inputType"
            :value="value"
            :data-test-id="testId.input"
            :class="[
                $style['c-formField-field'],
                $style['c-formField-field--noFocus'],
                $style[`c-formField-field--${inputType}`],
                {
                    [$style['c-formField--invalid']]: hasError
                }]"
            @change="updateSelectionControl"
        >

        <form-label
            :id="`label-${$attrs.id}`"
            data-test-id="selection-control-form-label"
            :label-for="$attrs.id"
            :label-description="$attrs.labelDescription"
        >
            {{ labelText }}
        </form-label>
    </div>
</template>

<script>
import FormLabel from './FormLabel.vue';
import {
    VALID_SELECTION_CONTROL_TYPES,
    DEFAULT_SELECTION_CONTROL_TYPE
} from '../constants';

export default {
    components: {
        FormLabel
    },

    inheritAttrs: false,

    props: {
        labelText: {
            type: String,
            default: ''
        },
        attributes: {
            type: Object,
            default: () => ({})
        },
        inputType: {
            type: String,
            default: DEFAULT_SELECTION_CONTROL_TYPE,
            validator: value => VALID_SELECTION_CONTROL_TYPES.indexOf(value) !== -1
        },
        value: {
            type: String,
            default: ''
        },
        hasError: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        testId () {
            const formFieldName = (this.attributes && this.attributes.name ? this.attributes.name : null);

            return {
                container: formFieldName ? `formfield-${formFieldName}` : 'formfield-container',
                input: formFieldName ? `formfield-${formFieldName}-${this.inputType}` : 'formfield-input'
            };
        }
    },

    methods: {
        updateSelectionControl (event) {
            this.$emit('update', event.target.checked);
        }
    }
};
</script>

<style lang="scss" module>
    .c-formField-field--noFocus {
        &:focus,
        &:active,
        &:focus-within {
            box-shadow: none;
        }
    }

    .c-formField-field--checkbox,
    .c-formField-field--radio {
        position: absolute;
        opacity: 0;
        z-index: -1;
    }

    .c-formField-field--checkbox + label,
    .c-formField-field--radio + label {
        cursor: pointer;
        font-weight: $font-weight-regular;
        @include font-size('body-l');
    }

    .c-formField-field--checkbox:disabled + label,
    .c-formField-field--radio:disabled + label,
    .c-formField-field--checkbox:disabled + label span {
        cursor: default;
        color: $color-content-disabled;
    }

    .c-formField-field--checkbox + label:before,
    .c-formField-field--radio + label:before {
        content: '';
        border: 1px solid $color-grey-45;
        display: inline-block;
        width: 22px;
        height: 22px;
        margin-right: spacing();
        margin-top: spacing();
        vertical-align: -5px;
    }

    .c-formField-field--checkbox + label:before {
        border-radius: 2px;
    }

    .c-formField-field--radio + label:before {
        border-radius: 50%;
    }

    .c-formField-field--checkbox.c-formField--invalid + label:before,
    .c-formField-field--radio.c-formField--invalid + label:before {
        border-color: $form-input-borderColour--invalid;
    }

    .c-formField-field--checkbox:checked + label:before {
        background-image: inline('#{$icon-path}/check--white.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 14px;
        border: 1px solid $color-interactive-brand;
        background-color: $color-interactive-brand;
    }

    .c-formField-field--radio:checked + label:before {
        border: 7px solid $color-interactive-brand;
        background-color: $color-white;
    }

    .c-formField-field--checkbox:focus + label:before,
    .c-formField-field--radio:focus + label:before {
        box-shadow: 0 0 0 1px $color-white, 0 0 0 3px $color-focus;

        /*
            https://stackoverflow.com/a/58570835

            Visible in Windows high-contrast themes
            box-shadow will be hidden in these modes and
            transparency will not be hidden in high-contrast
            thus box-shadow will not show but the outline will
            providing accessibility */
        outline: transparent dotted 2px;
    }

    .c-formField-field--checkbox:focus + label:before {
        border: 1px solid $color-interactive-brand;
    }

    .c-formField-field--checkbox:focus:not(:checked) + label:before,
    .c-formField-field--radio:focus:not(:checked) + label:before {
        box-shadow: 0 0 0 1px $color-white, 0 0 0 3px $color-focus;

        border: 1px solid $color-grey-45;
    }

    .c-formField-field--checkbox:not(:disabled):checked + label:hover:before,
    .c-formField-field--radio:not(:disabled):checked + label:hover:before {
        background-color: darken($color-interactive-brand, $color-hover-01);
    }

    .c-formField-field--checkbox:not(:disabled):checked + label:hover:before {
        border: 1px solid darken($color-interactive-brand, $color-hover-01);
    }

    .c-formField-field--radio:not(:disabled):checked + label:hover:before {
        border: 7px solid darken($color-interactive-brand, $color-hover-01);
        background-color: darken($color-white, $color-hover-01);
    }

    .c-formField-field--checkbox:not(:disabled):not(:checked) + label:hover:before,
    .c-formField-field--radio:not(:disabled):not(:checked) + label:hover:before {
        background-color: darken($color-white, $color-hover-01);
    }

    .c-formField-field--checkbox:disabled + label:before,
    .c-formField-field--radio:disabled + label:before {
        border-color: $color-grey-30;
        background-color: $color-grey-30;
        cursor: default;
    }

    .c-formField-field--checkbox:disabled:checked + label:before {
        background-image: inline('#{$icon-path}/check--grey.svg');
    }

    .c-formField-field--radio:disabled:checked + label:before {
        background-color: $color-grey-45;
    }
</style>
