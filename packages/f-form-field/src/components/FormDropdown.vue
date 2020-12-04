<template>
    <div
        :class="$style['c-formDropdown']"
        :data-test-id="testId.container">
        <caret-icon
            :class="$style['c-formDropdown-icon']"
            :data-test-id="testId.icon" />
        <select
            id="time-selection"
            :class="$style['c-formDropdown-select']"
            :data-test-id="testId.select"
            v-bind="attributes"
            @change="updateOption">
            <option
                v-for="(option, index) in dropdownOptions"
                :key="index"
                :data-test-id="`${testId.option}-${index}`"
                :value="option">{{ option }}</option>
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

    props: {
        attributes: {
            type: Object,
            default: () => {}
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

    path {
        fill: $grey--dark;
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
}
</style>
