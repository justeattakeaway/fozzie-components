<template>
    <label
        :for="uniqueId"
        data-test-id="switch-component"
        :class="$style['c-switch']">
        <input
            :id="uniqueId"
            role="switch"
            type="checkbox"
            v-bind="$attrs"
            :class="$style['c-switch-input']"
            :aria-checked="isChecked"
            @change="switchOption">

        <div :class="$style['c-switch-control']">
            <check-icon
                v-if="isChecked"
                :class="$style['c-switch-icon']"
                aria-hidden="true" />
        </div>
    </label>
</template>

<script>
import { CheckIcon } from '@justeattakeaway/pie-icons-vue';
import { v4 as uuid } from 'uuid';

export default {
    name: 'FSwitch',

    components: {
        CheckIcon
    },

    inheritAttrs: false,

    computed: {
        uniqueId () {
            const idArray = ['switch'];

            if (this.$attrs.name) idArray.push(this.$attrs.name);
            if (this.$attrs.id) idArray.push(this.$attrs.id);

            idArray.push(this.uniqueIdentifierId);
            return idArray.join('-');
        },

        isChecked () {
            return this.$attrs.checked;
        }
    },

    created () {
        this.uniqueIdentifierId = uuid();
    },

    methods: {
        switchOption (event) {
            this.$emit('update', event.target.checked);
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

$switch-colour: f.$color-interactive-form;
$switch-colour--checked: f.$color-interactive-brand;
$switch-colour--disabled: f.$color-disabled-01;
$switch-width: 48px;
$switch-height: 24px;
$switch-control-size: 20px;
$switch-padding: 2px;
$switch-radius: f.$radius-rounded-e;
$switch-icon-size: 14px;

$switch-translation: calc($switch-width - $switch-control-size - 2 * $switch-padding);

@mixin switch-transition ($property) {
    @media (prefers-reduced-motion: no-preference) {
        transition-property: $property;
        transition-duration: 0.15s;
        transition-timing-function: cubic-bezier(0.4, 0, 0.9, 1);
        transition-delay: 0s;
    }
}

.c-switch {
    display: flex;
    @include switch-transition(background-color);
    width: $switch-width;
    height: $switch-height;
    flex-shrink: 0;
    padding: $switch-padding;
    border-radius: $switch-radius;
    background-color: $switch-colour;
    cursor: pointer;

    &:hover {
        background-color: darken($switch-colour, f.$color-hover-01);
    }

    &:focus,
    &:focus-within {
        background-color: $switch-colour;
        box-shadow: 0 0 0 2px f.$color-focus-inner, 0 0 0 4px f.$color-focus-outer;
    }

    &:active {
        background-color: darken($switch-colour, f.$color-active-01);
    }

    &:has(.c-switch-input:checked) {
        @include switch-transition(background-color);
        background-color: $switch-colour--checked;

        &:hover {
            background-color: darken($switch-colour--checked, f.$color-hover-01);
        }

        &:focus,
        &:focus-within {
            background-color: $switch-colour--checked;
        }

        &:active {
            background-color: darken($switch-colour--checked, f.$color-active-01);
        }
    }

    &:has(.c-switch-input:disabled) {
        background-color: $switch-colour--disabled;

        cursor: not-allowed;
        pointer-events: none;
    }
}

.c-switch-input {
    appearance: none;
    margin: 0;
}

.c-switch-control {
    @include switch-transition(transform);
    display: flex;
    align-items: center;
    justify-content: center;
    width: $switch-control-size;
    height: $switch-control-size;
    border-radius: $switch-radius;
    background-color: f.$color-content-interactive-light;

    .c-switch-input:checked + & {
        @include switch-transition(transform);
        transform: translateX($switch-translation);
    }

    .c-switch-input:disabled ~ & {
        path {
            @include switch-transition(fill);
            fill: $switch-colour--disabled;
        }
    }
}

[dir="rtl"] {
    .c-switch-input:checked + .c-switch-control {
        @include switch-transition(transform);
        transform: translateX(-$switch-translation);
    }
}

.c-switch-icon {
    width: $switch-icon-size;
    height: $switch-icon-size;

    path {
        @include switch-transition(fill);
        fill: $switch-colour--checked;
    }
}
</style>
