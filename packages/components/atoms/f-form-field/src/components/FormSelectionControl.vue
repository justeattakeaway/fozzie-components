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
                {
                    [$style['c-formField-field--checkbox']]: isCheckbox,
                    [$style['c-formField--invalid']]: hasError
                }]"
            @change="updateSelectionControl"
        >

        <form-label
            :id="`label-${$attrs.id}`"
            :label-for="$attrs.id"
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
            default: () => {}
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
        },

        isCheckbox () {
            return this.inputType === 'checkbox';
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
    /**
        Changing the color of an inline SVG. The color needs to be encoded, so '#' turns into '%23'.
        Had a lot of problems trying to save the SVG in the `assets` folder, since it wouldn't load, and including it
        in `f-vue-icons` wouldn't help, since we need to use this in the `<style>` section, and not as a Vue component.
    */
    @mixin tick-svg($color) {
        $encodedColor: '%23' + str-slice(#{$color}, 2);
        background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg fill='none' viewBox='0 0 15 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m4.5 9.4722-2.9861-2.9861c-0.15636-0.1569-0.36876-0.2451-0.59027-0.2451-0.22152 0-0.43392 0.0882-0.59028 0.2451-0.15691 0.15637-0.2451 0.36877-0.2451 0.59028 0 0.22152 0.088195 0.43392 0.2451 0.59028l3.5771 3.5771c0.15636 0.1569 0.36876 0.2451 0.59028 0.2451 0.22151 0 0.43391-0.0882 0.59028-0.2451l8.9229-8.9243c0.1569-0.15637 0.2451-0.36877 0.2451-0.59028 0-0.22152-0.0882-0.43392-0.2451-0.59028-0.1564-0.15691-0.3688-0.2451-0.5903-0.2451s-0.4339 0.088195-0.5903 0.2451l-8.3333 8.3333z' clip-rule='evenodd' fill='#{$encodedColor}' fill-rule='evenodd'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 14px;
    }

    .c-formField-field--noFocus {
        &:focus,
        &:active,
        &:focus-within {
            box-shadow: none;
        }
    }

    .c-formField-field--checkbox {
        position: absolute;
        opacity: 0;
        z-index: -1;
    }

    .c-formField-field--checkbox + label {
        cursor: pointer;
        font-weight: $font-weight-regular;
        @include font-size('body-l');
    }

    .c-formField-field--checkbox:disabled + label {
        cursor: default;
    }

    .c-formField-field--checkbox + label:before {
        content: '';
        border: 1px solid $color-grey-45;
        border-radius: 2px;
        display: inline-block;
        width: 22px;
        height: 22px;
        margin-right: spacing();
        margin-top: spacing();
        vertical-align: -5px;
    }

    .c-formField-field--checkbox.c-formField--invalid + label:before {
        border-color: $form-input-borderColour--invalid;
    }

    .c-formField-field--checkbox:checked + label:before {
        @include tick-svg($color-white);

        border: 1px solid $color-interactive-brand;
        background-color: $color-interactive-brand;
    }

    .c-formField-field--checkbox:focus + label:before {
        box-shadow: 0 0 0 1px $color-white, 0 0 0 3px $color-focus;

        border: 1px solid $color-interactive-brand;

        /*
            https://stackoverflow.com/a/58570835

            Visible in Windows high-contrast themes
            box-shadow will be hidden in these modes and
            transparency will not be hidden in high-contrast
            thus box-shadow will not show but the outline will
            providing accessibility */
        outline: transparent dotted 2px;
    }

    .c-formField-field--checkbox:focus:not(:checked) + label:before {
        box-shadow: 0 0 0 1px $color-white, 0 0 0 3px $color-focus;

        border: 1px solid $color-grey-45;
    }

    .c-formField-field--checkbox:not(:disabled):not(:checked) + label:hover:before {
        background-color: darken($color-white, $color-hover-01);
    }

    .c-formField-field--checkbox:disabled + label:before {
        border: 1px solid $color-grey-30;
        background-color: $color-grey-30;
        cursor: default;
    }

    .c-formField-field--checkbox:disabled:checked + label:before {
        @include tick-svg($color-grey-45);
    }
</style>
