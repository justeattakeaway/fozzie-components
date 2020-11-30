<template>
    <div
        :class="$style['c-formDropdown']"
        data-test-id="formDropdown">
        <caret-icon
            :class="$style['c-formDropdown-icon']"
            data-test-id="formDropdown-icon" />
        <select
            id="time-selection"
            :class="$style['c-formDropdown-select']"
            data-test-id="formDropdown-select"
            @change="updateOption">
            <option
                v-for="(option, index) in dropdownOptions"
                :key="index"
                :data-test-id="`formDropdown-option-${index}`"
                :value="option">
                {{ option }}
            </option>
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
        dropdownOptions: {
            type: Array,
            default: () => null
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
