<template>
    <label
        :for="uniqueId"
        data-test-id="toggle-component"
        :class="$style['c-toggle']">
        <input
            :id="uniqueId"
            role="switch"
            type="checkbox"
            v-bind="$attrs"
            :class="$style['c-toggle-input']"
            :aria-checked="isChecked"
            @change="toggleOption">

        <div :class="$style['c-toggle-control']">
            <check-icon
                v-if="isChecked"
                :class="$style['c-toggle-icon']"
                aria-hidden="true" />
        </div>
    </label>
</template>

<script>
import { CheckIcon } from '@justeattakeaway/pie-icons-vue';
import { v4 as uuid } from 'uuid';

export default {
    name: 'FToggle',

    components: {
        CheckIcon
    },

    inheritAttrs: false,

    computed: {
        uniqueId () {
            const idArray = ['toggle'];

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
        toggleOption (event) {
            this.$emit('update', event.target.checked);
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

$toggle-colour: f.$color-interactive-form;
$toggle-colour--checked: f.$color-interactive-brand;
$toggle-colour--disabled: f.$color-disabled-01;
$toggle-width: 48px;
$toggle-height: 24px;
$toggle-control-size: 20px;
$toggle-padding: 2px;
$toggle-radius: f.$radius-rounded-e;
$toggle-icon-size: 14px;

$toggle-translation: calc($toggle-width - $toggle-control-size - 2 * $toggle-padding);

@mixin toggle-transition ($property) {
    @media (prefers-reduced-motion: no-preference) {
        transition-property: $property;
        transition-duration: 0.15s;
        transition-timing-function: cubic-bezier(0.4, 0, 0.9, 1);
        transition-delay: 0s;
    }
}

.c-toggle {
    display: flex;
    @include toggle-transition(background-color);
    width: $toggle-width;
    height: $toggle-height;
    padding: $toggle-padding;
    border-radius: $toggle-radius;
    background-color: $toggle-colour;
    cursor: pointer;

    &:hover {
        background-color: darken($toggle-colour, f.$color-hover-01);
    }

    &:focus,
    &:focus-within {
        background-color: $toggle-colour;
        box-shadow: 0 0 0 2px f.$color-focus-inner, 0 0 0 4px f.$color-focus-outer;
    }

    &:active {
        background-color: darken($toggle-colour, f.$color-active-01);
    }

    &:has(.c-toggle-input:checked) {
        @include toggle-transition(background-color);
        background-color: $toggle-colour--checked;

        &:hover {
            background-color: darken($toggle-colour--checked, f.$color-hover-01);
        }

        &:focus,
        &:focus-within {
            background-color: $toggle-colour--checked;
        }

        &:active {
            background-color: darken($toggle-colour--checked, f.$color-active-01);
        }
    }

    &:has(.c-toggle-input:disabled) {
        background-color: $toggle-colour--disabled;

        cursor: not-allowed;
        pointer-events: none;
    }
}

.c-toggle-input {
    appearance: none;
    margin: 0;
}

.c-toggle-control {
    @include toggle-transition(transform);
    display: flex;
    align-items: center;
    justify-content: center;
    width: $toggle-control-size;
    height: $toggle-control-size;
    border-radius: $toggle-radius;
    background-color: f.$color-content-interactive-light;

    .c-toggle-input:checked + & {
        @include toggle-transition(transform);
        transform: translateX($toggle-translation);
    }

    .c-toggle-input:disabled ~ & {
        path {
            @include toggle-transition(fill);
            fill: $toggle-colour--disabled;
        }
    }
}

[dir="rtl"] {
    .c-toggle-input:checked + .c-toggle-control {
        @include toggle-transition(transform);
        transform: translateX(-$toggle-translation);
    }
}

.c-toggle-icon {
    width: $toggle-icon-size;
    height: $toggle-icon-size;

    path {
        @include toggle-transition(fill);
        fill: $toggle-colour--checked;
    }
}
</style>
