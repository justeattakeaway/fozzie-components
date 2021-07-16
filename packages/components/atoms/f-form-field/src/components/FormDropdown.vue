<template>
    <div
        :class="$style['c-formDropdown']"
        :disabled="attributes.disabled"
        :data-test-id="testId.container">
        <caret-icon
            :class="$style['c-formDropdown-icon']"
            :data-test-id="testId.icon" />
        <select
            :id="$attrs.id"
            :class="$style['c-formDropdown-select']"
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
    padding: 0 spacing(x2);
    height: 100%;
    width: 100%;
    font: inherit;
    color: inherit;
    background: transparent;
    outline: none;

    /* Remove default styling */
    border: none;
    appearance: none;

    &:hover {
        background-color: $form-input-bg--hover;
    }

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
