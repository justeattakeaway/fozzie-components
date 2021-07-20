<template>
    <div
        :class="$style[`c-formDropdown-padding-${fieldSize}`]"
        :data-test-id="testId.container">
        <caret-icon
            :class="$style['c-formDropdown-icon']"
            :data-test-id="testId.icon" />
        <select
            :id="$attrs.id"
            :class="[
                $style['c-formDropdown-select'],
                $style['c-formField-field'],
                $style[`c-formField-field--${fieldSize}`], {
                    [$style['c-formField--invalid']]: hasError,
                    [$style['c-formField-padding--iconLeft']]: hasIcon
                }]"
            :disabled="attributes.disabled"
            :data-test-id="testId.select"
            v-bind="attributes"
            :value="value"
            @change="updateOption">
            <option
                v-for="(option, index) in dropdownOptions"
                :key="index"
                :data-test-id="`${testId.option}-${index}`"
                :value="option.value">{{ option.text }}</option>
        </select>
    </div>
</template>

<script>
import { CaretIcon } from '@justeat/f-vue-icons';

export default {
    name: 'FormField',

    components: {
        CaretIcon
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
$icon-positon--small              : 17px;
$icon-positon--medium             : 21px;
$icon-positon--large              : 25px;

.c-formDropdown-padding-small {
    @include icon-position($icon-positon--small);
}

.c-formDropdown-padding-medium {
    @include icon-position($icon-positon--medium);
}

.c-formDropdown-padding-large {
    @include icon-position($icon-positon--large);
}

.c-formDropdown-icon {
    width: spacing(x1.5);
    position: absolute;
    right: spacing(x3);
    bottom: 20px;
    transform: rotate(180deg);
    pointer-events: none;

    path {
        fill: $color-content-subdued;
    }
}

.c-formDropdown-select {
    /* Remove default styling */
    outline: none;
    appearance: none;
    padding-right: $formField-icon-padding;
}
</style>
