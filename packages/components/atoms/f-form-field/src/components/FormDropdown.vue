<template>
    <div
        :data-test-id="testId.container">
        <select
            :id="$attrs.id"
            :class="[
                $style['c-formDropdown-select'],
                $style['c-formField-field'],
                $style[`c-formField-field--${fieldSize}`], {
                    [$style['c-formField--invalid']]: hasError,
                    [$style['c-formField-padding--iconLeading']]: hasIcon
                }]"
            :disabled="attributes.disabled"
            :aria-required="isRequired"
            :data-test-id="testId.select"
            v-bind="attributes"
            :value="value"
            @change="updateOption">
            <option
                v-for="(option, index) in dropdownOptions"
                :key="index"
                :disabled="option.disabled"
                :selected="option.selected"
                :data-test-id="`${testId.option}-${index}`"
                :value="option.value">{{ option.text }}</option>
        </select>

        <caret-down-filled-icon
            :class="$style['c-formDropdown-icon']"
            :data-test-id="testId.icon" />
    </div>
</template>

<script>
import { CaretDownFilledIcon } from '@justeattakeaway/pie-icons-vue';

export default {
    name: 'FormDropdown',

    components: {
        CaretDownFilledIcon
    },

    inheritAttrs: false,

    props: {
        attributes: {
            type: Object,
            default: () => {}
        },
        value: {
            type: String,
            default: ''
        },
        dropdownOptions: {
            type: Array,
            default: () => null
        },
        fieldSize: {
            type: String,
            default: 'medium'
        },
        hasError: {
            type: Boolean,
            default: false
        },
        hasIcon: {
            type: Boolean,
            default: false
        },
        isRequired: {
            type: Boolean,
            default: true
        }
    },

    computed: {
        testId () {
            const formFieldName = (this.attributes && this.attributes.name ? this.attributes.name : null);

            return {
                container: formFieldName ? `formfield-${formFieldName}-dropdown` : 'formfield-dropdown',
                icon: formFieldName ? `formfield-${formFieldName}-dropdown-icon` : 'formfield-dropdown-icon',
                select: formFieldName ? `formfield-${formFieldName}-dropdown-select` : 'formfield-dropdown-select',
                option: formFieldName ? `formfield-${formFieldName}-dropdown-option` : 'formfield-dropdown-option'
            };
        }
    },

    methods: {
        updateOption (event) {
            this.$emit('update', event.target.value);
        }
    }
};
</script>

<style lang="scss" module>
$form-dropdown-iconIndent                     : 21px;
$form-dropdown-iconIndent--small              : 17px;
$form-dropdown-iconIndent--large              : 25px;

.c-formDropdown-icon {
    width: spacing(c);
    position: absolute;
    right: spacing(e);
    pointer-events: none;

    path {
        fill: $color-content-subdued;
    }

    .c-formField-field--small ~ & {
        bottom: $form-dropdown-iconIndent--small;
    }

    .c-formField-field--medium ~ & {
        bottom: $form-dropdown-iconIndent;
    }

    .c-formField-field--large ~ & {
        bottom: $form-dropdown-iconIndent--large;
    }
}

.c-formDropdown-iconIndent--small {
    bottom: $form-dropdown-iconIndent--small;
}

.c-formDropdown-iconIndent--medium {
    bottom: $form-dropdown-iconIndent;
}

.c-formDropdown-iconIndent--large {
    bottom: $form-dropdown-iconIndent--large;
}

.c-formDropdown-select {
    padding-right: $form-input-iconPadding;

    /* Remove default styling */
    outline: none;
    appearance: none;
}
</style>
